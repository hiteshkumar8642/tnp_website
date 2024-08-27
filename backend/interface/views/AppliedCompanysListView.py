from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from interface.models import AppliedCompany
from interface.serializers import AppliedCompanySerializer
from rest_framework.permissions import IsAuthenticated
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AppliedCompanysListView(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the applied companies associated with the user
        applications = AppliedCompany.objects.filter(user_id=user.id)

        # Check if no applications are found and return a 204 No Content response
        if not applications.exists():
            logger.info(f"No applications found for user with ID: {user.id}")
            return Response({'detail': 'No applications found for the user.'}, status=status.HTTP_204_NO_CONTENT)

        # Serialize the Application objects
        serializer = AppliedCompanySerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Handle case where the Application object doesn't exist
        logger.error(f"Application not found for the user with ID: {user.id}")
        return Response({'detail': 'Application not found for the user.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Handle database errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Handle any other unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
