from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.serializers import UserListSerializer
from django.contrib.auth.models import User
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
def ExistingUserListView(request):
    try:
        # Retrieve all users
        users = User.objects.all()

        # Check if there are no users
        if not users.exists():
            logger.info("No users found.")
            return Response({'detail': 'No users found.'}, status=status.HTTP_204_NO_CONTENT)

        # Serialize the user data
        serializer = UserListSerializer(users, many=True)
        logger.info(f"User list retrieved: {len(users)} users found.")

        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)

    except DatabaseError as db_err:
        # Log database errors
        logger.error(f"Database error occurred: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected errors
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
