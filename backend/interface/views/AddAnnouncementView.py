from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import Announcement
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddAnnouncementView(request):
    try:
        # Get the current authenticated user and their role
        user = request.user
        role = user.userprofile.role
        college_branch = user.userdetails.college_branch

        announcement_text = request.data.get('announcement')

        # Check if the user has the required role
        if role in [3, 4]:
            # Create and save the announcement object
            announcement = Announcement.objects.create(
                user=user,
                announcement=announcement_text,
                college_branch=college_branch
            )
            return Response({"message": "Announcement created successfully."}, status=status.HTTP_201_CREATED)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({"message": "You do not have permission to add an announcement."}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
