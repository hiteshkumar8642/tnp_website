# middleware.py

from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.http import JsonResponse
from django.conf import settings
from django.utils.encoding import force_bytes
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta

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
                    # Try to refresh the token
                    response = self.refresh_token(request)
                    if response.status_code == 200:
                        new_access_token = response.json().get('access')
                        if new_access_token:
                            # Update the access token in the cookie
                            response = JsonResponse({'detail': 'Token refreshed.'})
                            response.set_cookie('access_token', new_access_token, httponly=True)
                            request.COOKIES['access_token'] = new_access_token
                            validated_token = jwt_auth.get_validated_token(new_access_token)
                            request.user = jwt_auth.get_user(validated_token)
                            return response
                    else:
                        request.user = None
                else:
                    request.user = None
        else:
            request.user = None

    def refresh_token(self, request):
        """
        Call the token refresh endpoint to get a new access token.
        This method should be adapted to match your actual endpoint and logic.
        """
        from django.core.handlers.wsgi import WSGIRequest

        # Simulating a request to refresh the token
        from django.test import Client
        client = Client(enforce_csrf_checks=True)
        response = client.post('user/api/token/refresh/', HTTP_COOKIE=request.COOKIES.get('refresh_token'))
        return response
