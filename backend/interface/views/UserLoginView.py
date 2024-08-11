from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
# from . forms import createUserForm , CollegeRegistrationForm
from django.views.decorators.csrf import csrf_exempt

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from dashboard.models import UserDetails,UserProfile,UserDetails
from dashboard.serializers import UserDetailsSerializer, UserProfileSerializer
from django.urls import reverse_lazy
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


class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Call the parent class's post method to get the response
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == status.HTTP_200_OK:
            # Retrieve tokens from the response
            refresh = response.data.get('refresh')
            access = response.data.get('access')
            
            if refresh and access:
                try:
                    # Validate the access token
                    jwt_auth = JWTAuthentication()
                    validated_token = jwt_auth.get_validated_token(access)
                    user = jwt_auth.get_user(validated_token)
                    
                    # Fetch user details and profile
                    userdetails = UserDetails.objects.filter(user=user)
                    user_details = UserDetailsSerializer(userdetails, many=True).data
                    
                    user_profile = UserProfile.objects.filter(user=user)
                    user_profile_data = UserProfileSerializer(user_profile, many=True).data
                    
                    # Return user details, profile, and tokens in the response
                    return Response({
                        'user_detail': user_details,
                        'user_profile': user_profile_data,
                        'refresh_token': refresh,
                        'access_token': access
                    }, status=status.HTTP_200_OK)

                except Exception as e:
                    # Handle token validation errors
                    return JsonResponse({'detail': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
            
            else:
                # Tokens are missing from the response data
                return JsonResponse({'detail': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Handle unexpected response status codes
        return response