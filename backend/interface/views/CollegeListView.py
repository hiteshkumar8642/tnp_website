from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from interface.models import College
from interface.serializers import CollegeSerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
def CollegeListView(request):
    try:
        # Retrieve verified college objects
        colleges = College.objects.filter(is_verified=True)

        # If no colleges are found, return a 204 No Content response
        if not colleges.exists():
            logger.info("No verified colleges found.")
            return Response({'detail': 'No verified colleges available.'}, status=status.HTTP_204_NO_CONTENT)

        # Serialize and return the college data
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
