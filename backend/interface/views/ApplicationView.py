from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from dashboard.models import Application
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from dashboard.serializers import ApplicationSerializer

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

# Configure logging
logger = logging.getLogger(__name__)

# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ApplicationView(request):
    try:
        user = request.user
        # Attempt to retrieve all Application objects, ordered by 'last_date'
        applications = Application.objects.filter(college_branch=user.userdetails.college_branch).order_by('last_date')
        
        # Serialize the retrieved applications
        application_serializer = ApplicationSerializer(applications, many=True)
        
        # Return a successful response with serialized data
        return Response(application_serializer.data,status=status.HTTP_200_OK)
    
    except ObjectDoesNotExist:
        # Handle case where the Application object doesn't exist
        logger.error("Application objects not found.")
        return Response({'detail': 'Applications not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Handle database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        # Handle any other unspecified exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)