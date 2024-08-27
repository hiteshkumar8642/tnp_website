from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from interface.forms import createUserForm , CollegeRegistrationForm
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
from interface.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,UserProfile,UserDetails,CollegeCourse,College,Course
from interface.serializers import UserDetailsSerializer, UserProfileSerializer
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
from django.contrib.auth.forms import PasswordResetForm
from django.utils.translation import gettext_lazy as _

class ResetPasswordView(APIView):
    def post(self, request, *args, **kwargs):
        print("inAPI")
        form = PasswordResetForm(request.data)
       
        if form.is_valid():
            print("valid form")
            form.save(
                request=request,
                use_https=request.is_secure(),
                email_template_name='userDetails/password_reset_email.html',
                subject_template_name='userDetails/password_reset_subject.txt',
            )
            return Response(
                {"success": _("We've emailed you instructions for setting your password, "
                              "if an account exists with the email you entered. You should receive them shortly. "
                              "If you don't receive an email, "
                              "please make sure you've entered the address you registered with, and check your spam folder.")},
                status=status.HTTP_200_OK
            )
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


