from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import UserDetails
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



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UserDetailsModifyView(request):
    print("hii")
    try:
        user = request.user
        user_details = UserDetails.objects.get(user=user)
        print(request.data)
        # Update only the user details fields
        serializer = UserDetailsSerializer(user_details, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Details updated successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except UserDetails.DoesNotExist:
        return Response({'error': 'UserDetails not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)