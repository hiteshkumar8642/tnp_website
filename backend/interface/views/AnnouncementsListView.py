from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import Announcement
from rest_framework.views import APIView
from dashboard.serializers import AnnouncementSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

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
            return Response({'error': 'No Announcement'}, status=status.HTTP_404_NOT_FOUND)

        # Serialize and return the announcements
        serializer = AnnouncementSerializer(announcements, many=True)
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
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)