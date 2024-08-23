from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import Company
from rest_framework.views import APIView
from dashboard.serializers import CompanySerializer

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

# Configure logging
logger = logging.getLogger(__name__)


@api_view(['GET'])
def CompanyListView(request):
    try:
        print("Hello")
        Company = Company.objects.all()
        companyserializer = CompanySerializer(college,many=True)

        return Response(companyserializer.data,status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Handle case where the Company object doesn't exist
        logger.error("Company objects not found.")
        return Response({'detail': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)