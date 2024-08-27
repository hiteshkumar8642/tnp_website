from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import Announcement
from interface.serializers import AnnouncementSerializer

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AnnouncementsListView(request):
    try:
        user = request.user

        # Filter announcements based on the user's college branch
        announcements = Announcement.objects.filter(college_branch=user.userdetails.college_branch)

        # If no announcements are found, return an appropriate message
        if not announcements.exists():
            logger.info(f"No announcements found for user: {user.id} in college branch: {user.userdetails.college_branch}")
            return Response({'message': 'No announcements found.'}, status=status.HTTP_204_NO_CONTENT)

        # Serialize and return the announcements
        serializer = AnnouncementSerializer(announcements, many=True)
        logger.info(f"Announcements successfully retrieved for user: {user.id}")
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist as e:
        # Log the error and return a 404 response
        logger.error(f"Object not found error: {str(e)}")
        return Response({'detail': 'Requested object not found.', 'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log the database error and return a 500 response
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'Database error occurred.', 'error': str(db_err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any other unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
