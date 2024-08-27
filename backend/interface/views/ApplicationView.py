from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import Application
from interface.serializers import ApplicationSerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ApplicationView(request):
    try:
        user = request.user
        # Attempt to retrieve all Application objects for the user's college branch, ordered by 'last_date'
        applications = Application.objects.filter(college_branch=user.userdetails.college_branch).order_by('last_date')
        
        if not applications.exists():
            # Return 204 No Content if no applications are found
            return Response({'detail': 'No applications found.'}, status=status.HTTP_204_NO_CONTENT)
        
        # Serialize the retrieved applications
        application_serializer = ApplicationSerializer(applications, many=True)
        
        # Return a successful response with serialized data
        return Response(application_serializer.data, status=status.HTTP_200_OK)
    
    except ObjectDoesNotExist:
        # Log and return 404 if the Application object is not found
        logger.error("Application objects not found.")
        return Response({'detail': 'Applications not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log and return 500 for database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        # Log and return 400 for unexpected errors
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
