from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from interface.models import UserProfile, Shared_HR_contact
from interface.serializers import SharedHRContactSerializer

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharedHRListView(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the user's role from UserProfile
        user_profile = UserProfile.objects.get(user=user)
        role = user_profile.role

        # Check if the user has the required role
        if role in [3, 4]:
            # Fetch shared HR contacts for the user's college branch
            shared_hr_contacts = Shared_HR_contact.objects.filter(college_branch=user.userdetails.college_branch)

            # If shared_hr_contacts is empty, return 204 No Content
            if not shared_hr_contacts.exists():
                return Response(status=status.HTTP_204_NO_CONTENT)

            # Serialize and return the shared HR contacts
            serializer = SharedHRContactSerializer(shared_hr_contacts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({'message': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    except UserProfile.DoesNotExist:
        # Log the error if the UserProfile does not exist
        logger.error(f"UserProfile not found for user ID: {user.id}")
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log any database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
