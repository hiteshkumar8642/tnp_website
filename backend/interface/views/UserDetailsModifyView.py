from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from interface.models import UserDetails
from interface.serializers import UserDetailsSerializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UserDetailsModifyView(request):
    try:
        user = request.user
        user_details = UserDetails.objects.get(user=user)
        
        # Update user details using the serializer
        serializer = UserDetailsSerializer(user_details, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Details updated successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except UserDetails.DoesNotExist:
        # Log the error and return a 404 response if UserDetails object is not found
        logger.error(f"UserDetails for user with ID {user.id} not found.")
        return Response({'detail': 'UserDetails not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Log any unexpected exceptions and return a 500 Internal Server Error response
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
