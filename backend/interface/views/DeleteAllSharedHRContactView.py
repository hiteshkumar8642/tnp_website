from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import Shared_HR_contact
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteAllSharedHRContactView(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the role of the user
        role = user.userprofile.role

        # Check if the user has the appropriate role (3 or 4)
        if role in [3, 4]:
            # Get the college branch of the user
            branch = user.userdetails.college_branch

            # Delete all Shared_HR_contact objects associated with the user's branch
            deleted_count, _ = Shared_HR_contact.objects.filter(college_branch=branch).delete()

            # Check if any objects were deleted
            if deleted_count > 0:
                return Response({'message': 'Deleted successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'No records found to delete'}, status=status.HTTP_204_NO_CONTENT)

        else:
            # Return a failure message with an HTTP 403 Forbidden status if the user role is not authorized
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 500 Internal Server Error status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
