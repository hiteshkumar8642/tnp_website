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
def HRDataUpdateView(request):
    try:
        # Extract data from the POST request
        hr_id = request.data.get('id')
        status_data = request.data.get('status')

        if not hr_id or not status_data:
            return Response({'detail': 'ID and status are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the HRContact object
        hrcontact_obj = HRContact.objects.get(id=hr_id)
        hrcontact_obj.status = status_data
        hrcontact_obj.save()

        # Return a success response
        return Response({'message': 'Data updated successfully.'}, status=status.HTTP_200_OK)

    except HRContact.DoesNotExist:
        # Handle the case where the HRContact object does not exist
        logger.error(f"HRContact with id {hr_id} not found.")
        return Response({'detail': 'HRContact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
