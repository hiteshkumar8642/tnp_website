from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import UserProfile,UserDetails
from rest_framework.views import APIView
from dashboard.serializers import UserDetailsSerializer
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
def StudentListView(request):
    try:
        user = request.user
        
        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role==3 or role==4:
            userdetails = UserDetails.objects.filter(college_branch=user.userdetails.college_branch)
            # user_profile = UserProfile.objects.all()

            user_details_serializer = UserDetailsSerializer(userdetails,many=True)
            # user_profile_serializer = UserProfileSerializer(user_profile, many=True)

            return Response(user_details_serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"message":False},status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
            return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)    