from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import HRContact,UserProfile
from rest_framework.views import APIView
from dashboard.serializers import HRContactSerializer
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
def MyHRListView(request):
    try:
        # Get the current authenticated user
        user = request.user
        print("DEVVRAT")
        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Fetch HR contacts for the user's college branch assigned to the user
            hrContact = HRContact.objects.filter(college_branch=user.userdetails.college_branch, assigned=user)

            # Check if hrContact is empty
            if not hrContact.exists():
                return Response({'error': 'No HR Contacts'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize and return the HR contacts
            hrcontactserializer = HRContactSerializer(hrContact, many=True)
            return Response(hrcontactserializer.data, status=status.HTTP_200_OK)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({'message': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    except ObjectDoesNotExist:
        # Log the error if the UserProfile does not exist
        logger.error(f"UserProfile not found for user ID: {user.id}")
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log any database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)