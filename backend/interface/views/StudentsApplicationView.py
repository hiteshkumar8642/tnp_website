from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import AppliedCompany,User
from rest_framework.views import APIView
from dashboard.serializers import AppliedCompanySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from dashboard.models import Application, Company, AppliedCompany, UserProfile
import pandas as pd

# Configure logging
logger = logging.getLogger(__name__)


@api_view(['POST']) 
@permission_classes([IsAuthenticated])
def StudentsApplicationView(request):
    try:
        # user = request.user
        user = request.user
        id=request.POST.get('application')
        print(id)
        application = Application.objects.get(id=id)
        print(application)
        # Check if the user has already applied
        existing_application = AppliedCompany.objects.filter(
            user_id=user, application_id=application
        ).first()
        
        if existing_application:
            print("already applied")
            return Response({"detail": "Already applied."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new application
        application = AppliedCompany.objects.create(
            user_id=user,
            application_id=application
        )
        return Response({'message': 'Applied successfully.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)