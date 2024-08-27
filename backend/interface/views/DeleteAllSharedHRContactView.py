from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import Shared_HR_contact
from rest_framework.views import APIView
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
def DeleteAllSharedHRContactView(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the role of the user
        role = user.userprofile.role
        print(role)
        # Check if the user has the appropriate role (3 or 4)
        if role == 3 or role == 4:
            # Get the college branch of the user
            branch = user.userdetails.college_branch
            print(branch)
            # Delete all Shared_HR_contact objects associated with the user's branch
            Shared_HR_contact.objects.filter(college_branch=branch).delete()

            # Return a success message with an HTTP 200 OK status
            return Response({'message': 'Deleted'}, status=status.HTTP_200_OK)
        else:
            # Return a failure message with an HTTP 400 Bad Request status if the user role is not authorized
            return Response({"message": False}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)