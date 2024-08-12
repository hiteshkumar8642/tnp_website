from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import AppliedCompany
from rest_framework.views import APIView
from dashboard.serializers import AppliedCompanySerializer
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
def AppliedCompanysListView(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the Application object associated with the user
        application = AppliedCompany.objects.filter(user_id=user.id)

        # Serialize the Application object using AppliedCompanySerializer
        appliedcompanyserializer = AppliedCompanySerializer(application,many=True)

        # Return the serialized data with an HTTP 200 OK status
        return Response(appliedcompanyserializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Log the error and return a 404 response if the Application object is not found
        logger.error("Application not found for the user with ID: {}".format(user.id))
        return Response({'detail': 'Application not found for the user.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log the database error and return a 500 response
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any other unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)