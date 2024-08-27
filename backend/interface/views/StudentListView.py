from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from interface.models import UserProfile, UserDetails
from interface.serializers import UserDetailsSerializer
from django.shortcuts import get_object_or_404
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def StudentListView(request):
    try:
        user = request.user
        
        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role (3 or 4)
        if role in [3, 4]:
            # Filter UserDetails based on the user's college branch
            userdetails = UserDetails.objects.filter(college_branch=user.userdetails.college_branch)
            user_details_serializer = UserDetailsSerializer(userdetails, many=True)

            # Return user details with a 200 OK status
            return Response(user_details_serializer.data, status=status.HTTP_200_OK)
        else:
            # Return a 403 Forbidden response if the user does not have the required role
            return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
    
    except UserProfile.DoesNotExist:
        # Handle the case where the UserProfile is not found
        logger.error("UserProfile not found for user ID: {}".format(user.id))
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with HTTP 500
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
