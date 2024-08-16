from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from interface.forms import CollegeRegistrationForm
from django.views.decorators.csrf import csrf_exempt

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from interface.tokens import account_activation_token
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,UserProfile,UserDetails,CollegeCourse,College,Course
from dashboard.serializers import UserDetailsSerializer, UserProfileSerializer
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordResetView
from django.contrib.messages.views import SuccessMessageMixin

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import json
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

import logging

logger = logging.getLogger(__name__)

def activate_email(request, user, to_email):
    mail_subject = 'Activate your user account.'
    message = render_to_string('userDetails/active_account_email.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })
    print(message)
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request , "Registered succesfully ! Please confirm your email to login. If you didn't recieve any email, check if you typed your email correctly. ")
    else:
        messages.error(request, f'Problem sending confirmation email to {to_email}, check if you typed it correctly.')



@api_view(['POST'])
def CollegeRegisterView(request):
    try:
        data=request.data
    except json.JSONDecodeError:
        return Response({"errors": "Invalid JSON"}, status=400)
    
    print("Received data: ", data) 
    form = CollegeRegistrationForm(data)
    
    if form.is_valid():
        user = form.save(commit=False)
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

        branches = data.get('selectedBranches', [])
        for branch_id in branches:
            course_obj = Course.objects.get(id=branch_id)
            CollegeCourse.objects.create(college=college_obj, course=course_obj)

        return Response({'detail': 'Registration successful.'}, status=status.HTTP_200_OK)
    else:
        print("form not valid")
        print("Form errors: ", form.errors)
        return Response({"errors": form.errors}, status=400)