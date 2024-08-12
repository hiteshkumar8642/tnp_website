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
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
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
        print(college_branch)

        announcement = request.POST.get('announcement')

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Prepare data for serialization
            # data = {
            #     'user': user,  # Pass the user ID for the serializer
            #     'announcement': announcement,
            # }
            # Validate and save the announcement using a serializer
            announcement_serial = Announcement.objects.create(user=user,announcement=announcement,college_branch=college_branch)
            announcement_serial.save()
            print("vrat")
            return Response({"message": True}, status=status.HTTP_201_CREATED)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({"message": False}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)