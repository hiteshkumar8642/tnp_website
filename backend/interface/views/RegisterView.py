from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from interface.forms import createUserForm
from interface.tokens import account_activation_token
from interface.models import College, UserProfile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import logging
from decouple import config  # Importing config from decouple

# Configure logging
logger = logging.getLogger(__name__)

# Fetch frontend host from environment variable using config
FRONTEND_HOST = config('FRONTEND_HOST')

def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
        logger.error("User activation failed: Invalid token or user does not exist.")
        messages.error(request, 'Activation link is invalid!')
        return redirect(f"{FRONTEND_HOST}/login")

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Thank you for your email confirmation. Now you can log in to your account.')
    else:
        messages.error(request, 'Activation link is invalid!')

    return redirect(f"{FRONTEND_HOST}/login")

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
    try:
        email.send()
        messages.success(request, "Registered successfully! Please confirm your email to login.")
    except Exception as e:
        logger.error(f"Error sending confirmation email to {to_email}: {str(e)}")
        messages.error(request, f'Problem sending confirmation email to {to_email}. Check if you typed it correctly.')

@api_view(['POST'])
def RegisterView(request):
    try:
        data = json.loads(request.body)
        form = createUserForm(data)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            clg = College.objects.get(name=data.get('college'))
            user_profile_obj = UserProfile(user=user, role=1, college=clg)
            user_profile_obj.save()
            activate_email(request, user, form.cleaned_data.get('email'))
            return Response({'detail': 'Registration successful. Please check your email to activate your account.'}, status=status.HTTP_201_CREATED)
        else:
            errors = form.errors.as_json()
            logger.warning(f"Form errors during registration: {errors}")
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
    except json.JSONDecodeError:
        logger.error("Invalid JSON in request body.")
        return Response({"detail": "Invalid JSON."}, status=status.HTTP_400_BAD_REQUEST)
    except College.DoesNotExist:
        logger.error("College does not exist.")
        return Response({'detail': 'College does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Unexpected error during registration: {str(e)}")
        return Response({'detail': 'An error occurred during registration.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
