from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import HRContact
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def HRAssignMeView(request):
    try:
        # Check if the user has the appropriate role (3 or 4)
        if request.user.userprofile.role in [3, 4]:
            user = request.user
            identity = request.data.get('HR-identity')

            # Retrieve the college branch of the user
            branch = user.userdetails.college_branch

            # Get the HRContact object with the specified ID and college branch
            hr_contact = HRContact.objects.get(id=identity, college_branch=branch)
        
            # Assign the HRContact object to the current user
            hr_contact.assigned = user
            hr_contact.save()

            # Return a success response with an HTTP 200 OK status
            return Response({'message': 'HR contact assigned successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Not eligible to access this resource.'}, status=status.HTTP_403_FORBIDDEN)

    except HRContact.DoesNotExist:
        # Log the error and return a 404 response if the HRContact object is not found
        logger.error(f"HRContact with ID {identity} and branch {branch} not found.")
        return Response({'detail': 'HRContact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except PermissionDenied:
        # Log the permission denied error and return a 403 response
        logger.error(f"Permission denied for user with ID: {request.user.id}")
        return Response({'detail': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions and return a 500 Internal Server Error response
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
