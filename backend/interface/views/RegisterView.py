from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from django.views.decorators.csrf import csrf_exempt
from interface.forms import createUserForm
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
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status

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
def RegisterView(request):
    try:
        data = json.loads(request.body)
        print("hii data loaded")
    except json.JSONDecodeError:
        print("errors")
        return Response({"errors": "Invalid JSON"}, status=400)

    #print("Received data: ", data)  # Debug: print the received data
    form = createUserForm(data)
    id=0
    try:
        if form.is_valid():
            print("form valid")
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            id=user.id
            #print(data.get('college'))
            clg = College.objects.get(name=data.get('college'))
            user_profile_obj = UserProfile(user=user, role=1, college=clg)
            user_profile_obj.save()
            activate_email(request, user, form.cleaned_data.get('email'))
            return Response({'detail': 'Registration successful.'}, status=status.HTTP_200_OK)
        else:
            errors = form.errors.as_json()
            return Response({"errors": errors}, status=400)
    except Exception as e:
        u = User.objects.get(id = id)
        u.delete()
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)