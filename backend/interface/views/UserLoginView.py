from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from interface.models import UserDetails, UserProfile
from interface.serializers import UserDetailsSerializer, UserProfileSerializer

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
                    userdetails = UserDetails.objects.filter(user=user).first()
                    user_profile = UserProfile.objects.filter(user=user).first()
                    
                    user_details_data = UserDetailsSerializer(userdetails).data if userdetails else {}
                    user_profile_data = UserProfileSerializer(user_profile).data if user_profile else {}
                    
                    # Return user details, profile, and tokens in the response
                    return Response({
                        'user_detail': user_details_data,
                        'user_profile': user_profile_data,
                        'refresh_token': refresh,
                        'access_token': access
                    }, status=status.HTTP_200_OK)

                except Exception as e:
                    # Handle token validation errors
                    return JsonResponse({'detail': 'Token validation failed.', 'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
            
            else:
                # Tokens are missing from the response data
                return JsonResponse({'detail': 'Tokens not provided in the response.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Handle unexpected response status codes from the parent class
        return response
