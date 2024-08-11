from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import HRContact
from rest_framework.views import APIView
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
def HRDataUpdateView(request):
    try:
        hrid = request.POST.get('HR-id')
        data = request.POST.get('status')
        hrcontact_obj = HRContact.objects.get(id=hrid)
        hrcontact_obj.status = data
        hrcontact_obj.save()
        return Response({'message':'Data Updated'},status=status.HTTP_200_OK)
    
    except ObjectDoesNotExist:
        # Handle case where the Application object doesn't exist
        logger.error("College objects not found.")
        return Response({'detail': 'Applications not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)