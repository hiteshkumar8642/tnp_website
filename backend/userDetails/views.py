from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from . forms import createUserForm , CollegeRegistrationForm
from django.views.decorators.csrf import csrf_exempt

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .tokens import account_activation_token
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,UserProfile,UserDetails,CollegeCourse,College,Course

from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordResetView
from django.contrib.messages.views import SuccessMessageMixin

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# Create your views here.

def activate_email(request, user, to_email):
    mail_subject = 'Activate your user account.'
    message = render_to_string('userDetails/active_account_email.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request , "Registered succesfully ! Please confirm your email to login. If you didn't recieve any email, check if you typed your email correctly. ")
    else:
        messages.error(request, f'Problem sending confirmation email to {to_email}, check if you typed it correctly.')

def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Thank you for your email confirmation. Now you can login your account.')
        return redirect('login')
    else:
        messages.error(request, 'Activation link is invalid!')
    
    return redirect('login')
    

def register(request):
    form = createUserForm()
    if(request.method == 'POST'):
        form = createUserForm(request.POST)
        if form.is_valid() :
            user = form.save(commit = False)
            user.is_active = False
            user.save()
            clg=College.objects.get(name=request.POST.get('college'))
            user_profile_obj = UserProfile(user = user , role = 1,college = clg)
            user_profile_obj.save()
            activate_email(request , user , form.cleaned_data.get('email'))
            return redirect('login')
        else:
            for error in list(form.errors.values()):
                messages.error(request,error)
    
    return render(request, 'userDetails/register.html',{'form':form})


def login(request):
    if(request.method=='POST'):
        password = request.POST['password']
        username = request.POST['username']
        user = auth.authenticate(username = username , password = password)
        if user is not None :
            auth.login(request,user)
            user_profile_obj = UserProfile.objects.get(user = user)
            college = user_profile_obj.college 
            branches = CollegeCourse.objects.filter(college=college)
            try:
                userr = UserDetails.objects.get(user=user)
            except:
                userr= None
            if userr is not None :
                return redirect('dashboard')
            return render(request,"userDetails/userProfileDetails.html",{'branches':branches})
        else:
            messages.info(request,"Invalid credentials.")

    return render(request,'userDetails/login.html')

def userProfile(request):
    user = UserDetails.objects.get(user = request.user)
    return render(request,'userDetails/userProfile.html',{'user':user})

def SaveDetails(request):
    if(request.method=='POST'):
        #for field_name, uploaded_file in request.FILES.items():
                # Print the file details
                #print("Field Name:", field_name)
                #print("Uploaded File Name:", uploaded_file.name)
                #print("Uploaded File Size:", uploaded_file.size)
                #print("Uploaded File Content Type:", uploaded_file.content_type)
        if ('resume'  in request.FILES and 'photo' in request.FILES and 'graduation-marksheet' in request.FILES and '10th-marksheet' in request.FILES and '12th-marksheet' in request.FILES) :
            user = request.user
            resume = request.FILES['resume']
            photo = request.FILES['photo']
            backlogs = request.POST.get('backlogs')
            graduation_marksheet = request.FILES['graduation-marksheet']
            graduation_cgpa = request.POST.get('graduation-cgpa')
            twelfth_marksheet = request.FILES['12th-marksheet']
            twelfth_percentage = request.POST.get('12th-percentage')
            tenth_marksheet = request.FILES['10th-marksheet']
            tenth_percentage = request.POST.get('10th-percentage')
            current_cgpa = request.POST.get('graduation-cgpa')
            other_website_link = request.POST.get('website')
            leetcode_profile = request.POST.get('leetcode')
            codechef_profile = request.POST.get('codechef')
            codeforces_profile = request.POST.get('codeforces')
            github_profile = request.POST.get('github')
            portfolio_link = request.POST.get('portfolio')
            linkedin_profile = request.POST.get('linkedin')
            department = request.POST.get('department')
            gap_after_twelfth = request.POST.get('gap_after_twelfth')
            gap_after_graduation = request.POST.get('gap_after_graduation')
            mobile = request.POST.get('mobile')
            branch = request.POST.get('branch')
            print(branch)
            brnc= Course.objects.get(degree=branch)
            clgbrnc=CollegeCourse.objects.get(college=request.user.userprofile.college, course=brnc)
            user_db_obj = UserDetails(user = user,college_branch = clgbrnc,resume = resume, photo = photo , backlogs = backlogs , graduation_marksheet = graduation_marksheet , graduation_cgpa = graduation_cgpa , twelfth_marksheet = twelfth_marksheet , tenth_marksheet = tenth_marksheet ,twelfth_percentage = twelfth_percentage , tenth_percentage = tenth_percentage , current_cgpa = current_cgpa , other_website_link = other_website_link , leetcode_profile= leetcode_profile , codechef_profile = codechef_profile , codeforces_profile = codeforces_profile , github_profile = github_profile , portfolio_link  = portfolio_link , linkedin_profile = linkedin_profile , department = department , gap_after_graduation = gap_after_graduation , mobile = mobile , gap_after_twelfth = gap_after_twelfth)
            user_db_obj.save()
            return redirect('dashboard')
        else:
            print("error in files")
            return render(request , "userDetails/userProfileDetails.html")

    else: 
        print("error")

        return render(request , "userDetails/userProfileDetails.html")

def UpdateDetails(request):
    if(request.method=="POST"):
        user = request.user
        user_obj = UserDetails.objects.get(user = user)
        user_obj.current_cgpa = request.POST.get('currentcgpa')
        user_obj.backlogs = request.POST.get('backlogs')
        user_obj.codeforces = request.POST.get('codeforces')
        user_obj.codechef = request.POST.get('codechef')
        user_obj.leetcode = request.POST.get('leetcode')
        user_obj.github= request.POST.get('github')
        user_obj.portfolio = request.POST.get('portfolio')
        user_obj.website = request.POST.get('website')
        user_obj.save()
        return redirect('userProfile')
    else:
        return redirect('userProfile')

def CollegeRegister(request):
    form = CollegeRegistrationForm()
    BRANCH_CHOICES = [course for course in Course.objects.all()]
    if(request.method=="POST"):
        form = CollegeRegistrationForm(request.POST)
        
        if form.is_valid() :

            user = form.save(commit = False)
            user.is_active = False
            user.save()
            email = form.cleaned_data.get('email')
            activate_email(request, user, email)

            college_name = form.cleaned_data.get('college1')
            subdomain = form.cleaned_data.get('subdomain')
            college_obj = College(name=college_name, subdomain=subdomain, user=user)
            college_obj.save()

            user_profile_obj = UserProfile(user=user, role=4, college=college_obj)
            user_profile_obj.save()

            branches = request.POST.getlist('branches')
            for id in branches:
                clg_obj = College.objects.get(name = college_name)
                course_obj = Course.objects.get(id = id)
                College_course_obj = CollegeCourse(college=clg_obj,course=course_obj)
                College_course_obj.save()
            return redirect('login')
        else:
            for error in list(form.errors.values()):
                messages.error(request,error)

    return render(request,'UserDetails/CollegeRegister.html',{'form':form , 'branches':BRANCH_CHOICES})



class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
    template_name = 'userDetails/password_reset.html'
    email_template_name = 'userDetails/password_reset_email.html'
    subject_template_name = 'userDetails/password_reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    success_url = reverse_lazy('login')



from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            refresh = response.data['refresh']
            access = response.data['access']
            response.set_cookie('refresh_token', refresh, httponly=True)
            response.set_cookie('access_token', access, httponly=True)
            token = AccessToken(access)
            user_id = token['user_id']
            print(f'User ID: {user_id}')
        return response

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Clear the tokens from cookies
            response = Response({'detail': 'Logout successful.'}, status=status.HTTP_205_RESET_CONTENT)
            response.delete_cookie('refresh_token')
            response.delete_cookie('access_token')

            return response
        except TokenError as e:
            return Response({'detail': 'Invalid refresh token.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


