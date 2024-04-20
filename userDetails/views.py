from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from . forms import createUserForm

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .tokens import account_activation_token
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application


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
        messages.success(request , "Registered succesfully ! Please confirm your email to login. /n If you didn't recieve any email, check if you typed your email correctly. ")
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
            return render(request,"userDetails/userProfileDetails.html")
        else:
            messages.info(request,"Invalid credentials.")

    return render(request,'userDetails/login.html')

def userProfile(request):
    user = UserDetails.objects.get(user = request.user)
    return render(request,'userDetails/userProfile.html',{'user':user})

def SaveDetails(request):
    if(request.method=='POST'):
        for field_name, uploaded_file in request.FILES.items():
                # Print the file details
                print("Field Name:", field_name)
                print("Uploaded File Name:", uploaded_file.name)
                print("Uploaded File Size:", uploaded_file.size)
                print("Uploaded File Content Type:", uploaded_file.content_type)
        if ('resume'  in request.FILES and 'photo' in request.FILES and 'graduation_marksheet' in request.FILES and 'tenth_marksheet' in request.FILES and 'twelfth_marksheet' in request.FILES) :
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

            user_db_obj = userDetails(user = user,resume = resume, photo = photo , backlogs = backlogs , graduation_marksheet = graduation_marksheet , graduation_cgpa = graduation_cgpa , twelfth_marksheet = twelfth_marksheet , tenth_marksheet = tenth_marksheet ,twelfth_percentage = twelfth_percentage , tenth_percentage = tenth_percentage , current_cgpa = current_cgpa , other_website_link = other_website_link , leetcode_profile= leetcode_profile , codechef_profile = codechef_profile , codeforces_profile = codeforces_profile , github_profile = github_profile , portfolio_link  = portfolio_link , linkedin_profile = linkedin_profile , department = department , gap_after_graduation = gap_after_graduation , mobile = mobile , gap_after_twelfth = gap_after_twelfth)
            user_db_obj.save()
            return redirect('dashboard')
        else:
            print("error in files")
            return render(request , "userDetails/userProfileDetails.html")

    else: 
        print("error")
        return render(request , "userDetails/userProfileDetails.html")




