# middleware.py

from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.http import JsonResponse
import requests

class JWTAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        access_token = request.COOKIES.get('access_token')
        if access_token:
            jwt_auth = JWTAuthentication()
            try:
                validated_token = jwt_auth.get_validated_token(access_token)
                request.user = jwt_auth.get_user(validated_token)
            except (InvalidToken, TokenError):
                refresh_token = request.COOKIES.get('refresh_token')
                if refresh_token:
                    response = requests.post(
                        request.build_absolute_uri('/api/token/refresh/'),
                        cookies={'refresh_token': refresh_token}
                    )
                    if response.status_code == status.HTTP_200_OK:
                        new_access_token = response.json().get('access')
                        if new_access_token:
                            response = JsonResponse({'detail': 'Token refreshed.'})
                            response.set_cookie('access_token', new_access_token, httponly=True)
                            request.COOKIES['access_token'] = new_access_token
                            validated_token = jwt_auth.get_validated_token(new_access_token)
                            request.user = jwt_auth.get_user(validated_token)
                    else:
                        request.user = None
                else:
                    request.user = None
        else:
            request.user = None
