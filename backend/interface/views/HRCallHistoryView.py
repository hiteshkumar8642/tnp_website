from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import UserProfile,CallHistory
from rest_framework.views import APIView
from dashboard.serializers import CallHistorySerializer
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
def HRCallHistoryView(request):
    try:
        # Retrieve the authenticated user
        user = request.user
        
        # Retrieve the user's branch from UserDetails model
        branch = user.userdetails.college_branch

        # Retrieve the user's role from UserProfile model
        role = UserProfile.objects.get(user=user).role

        # Check if the user's role is either 3 or 4
        if role == 3 or role == 4:
            # Retrieve call history for the user's branch
            callhistory = CallHistory.objects.filter(college_branch=branch)
            print("Retrieving call history")
            
            # Serialize the call history data
            callhistory_serializer = CallHistorySerializer(callhistory, many=True)
            print("Serialization complete")
            
            # Return the serialized data with a 200 OK status
            return Response(callhistory_serializer.data, status=status.HTTP_200_OK)

        # If the role is not 3 or 4, return a 403 Forbidden response
        return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    except UserProfile.DoesNotExist:
        # Handle the case where the user's profile is not found
        return Response({'detail': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Handle any other exceptions and return a 400 Bad Request response
        print(f"Error occurred: {str(e)}")
        return Response({'detail': 'An error occurred'}, status=status.HTTP_400_BAD_REQUEST)
