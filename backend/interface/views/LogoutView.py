from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
import logging

# Configure logging
logger = logging.getLogger(__name__)

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            response = Response({'detail': 'Logout successful.'}, status=status.HTTP_204_NO_CONTENT)
            response.delete_cookie('refresh_token')
            response.delete_cookie('access_token')
            
            return response
        except TokenError as e:
            logger.error(f"Token error: {str(e)}")
            return Response({'detail': 'Invalid refresh token.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
