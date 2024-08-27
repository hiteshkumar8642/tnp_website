from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth import get_user_model, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordResetView
from django.contrib.messages.views import SuccessMessageMixin
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json
import logging

from interface.forms import CollegeRegistrationForm
from interface.tokens import account_activation_token
from interface.models import College, CollegeCourse, Course, UserProfile
from interface.serializers import UserDetailsSerializer, UserProfileSerializer

# Configure logging
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
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request, "Registered successfully! Please confirm your email to login. If you didn't receive an email, check if you typed your email correctly.")
    else:
        messages.error(request, f'Problem sending confirmation email to {to_email}, check if you typed it correctly.')

@api_view(['POST'])
def CollegeRegisterView(request):
    try:
        data = request.data
    except json.JSONDecodeError:
        return Response({"errors": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
    
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
            try:
                course_obj = Course.objects.get(id=branch_id)
                CollegeCourse.objects.create(college=college_obj, course=course_obj)
            except Course.DoesNotExist:
                logger.error(f"Course with ID {branch_id} does not exist.")
                return Response({"errors": f"Course with ID {branch_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        return Response({'detail': 'Registration successful.'}, status=status.HTTP_201_CREATED)
    else:
        logger.error(f"Form validation errors: {form.errors}")
        return Response({"errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)
