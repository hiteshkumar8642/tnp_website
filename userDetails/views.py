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
            return redirect('user_profile')
        else:
            messages.info(request,"Invalid credentials.")

    return render(request,'userDetails/login.html')

def user_profile(request):
    return render(request , 'userDetails/user_profile.html')

def save_user_data(request):
    per_10 = float(request.POST['10thPercentage'])
    per_12 = float(request.POST['12thPercentage'])
    grad_cgpa = float(request.POST['graduationCGPA'])
    reg_num = request.POST['registrationNumber']
    cur_cgpa = float(request.POST['currentCGPA'])
    backlogs = int(request.POST['backlogs'])
    website = request.POST['website']
    portfolio = request.POST['portfolio']
    github = request.POST['github']
    codeforces = request.POST['codeforces']
    leetcode = request.POST['leetcode']
    linkedin = request.POST['linkedin']
    codechef = request.POST['codechef']
    marksheet_10 = request.POST['10thMarksheet']
    marksheet_12 = request.POST['12thMarksheet']
    marksheet_grad = request.POST['graduationMarksheet']
    resume = request.POST['resume']
    






