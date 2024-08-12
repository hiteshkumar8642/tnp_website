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
from dashboard.models import Shared_HR_contact,HRContact
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from dashboard.serializers import SharedHRContactSerializer

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

# Configure logging
logger = logging.getLogger(__name__)

# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
# Create your views here.



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def HRContactModifyView(request):
    try:
        # Extract data from the POST request
        print(request.POST)
        name = request.POST.get('name')
        company_name = request.POST.get('companyName')
        email = request.POST.get('email')
        contact_number = request.POST.get('contactNumber')
        linkedin_id = request.POST.get('linkedinId')
        gender = request.POST.get('gender')
        print(name,company_name,email,contact_number,linkedin_id)

        # Get the current authenticated user
        users = request.user
        role = users.userprofile.role

        print(users)
        if role==2:
            print("Student")
            serializer = Shared_HR_contact(name=name,gender=gender, company_name=company_name, email=email, contact_number=contact_number,linkedin_id=linkedin_id,college_branch=users.userdetails.college_branch,user=users)
            serializer.save()
            return Response({"message": "HR contact created successfully."}, status=status.HTTP_201_CREATED)
        
        elif role==3 or role==4:
            print("HRContact")
            serializer = HRContact(name=name,  mail_id=email,gender = gender, mobile_numbers=contact_number,linkedin=linkedin_id,college_branch=users.userdetails.college_branch)
            serializer.save()
            return Response({"message": "HR contact created successfully ."}, status=status.HTTP_201_CREATED)


    except Exception as e:
        # Log the exception for debugging purposes
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
