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
from dashboard.serializers import AppliedCompanySerializer
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
def ReassignView(request):
    try:
        # Check if the user is authenticated and has the appropriate role (3 or 4)
        if request.user.userprofile.role in [3, 4]:
            user = request.user
            identity = request.POST.get('HR-identity')
            tnp_identity = request.POST.get('tnp-id')
            print(identity," ",tnp_identity)
            # Retrieve the college branch of the user
            branch = user.userdetails.college_branch

            # Get the HRContact object with the specified name and college branch
            hr_contact = get_object_or_404(HRContact, id=identity, college_branch=branch)
        
            # Assign the HRContact object to the current user
            tobeassigned_user = User.objects.get(id=tnp_identity)
            print(tobeassigned_user)
            print("Reassigned user : ",tobeassigned_user)
            hr_contact.reassigned = tobeassigned_user
            hr_contact.save()

            # Return a success response with an HTTP 200 OK status
            return Response({'message': 'HR contact reassigned successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'NOT Elligble to Access it'},status=status.HTTP_401_UNAUTHORIZED)

    except HRContact.DoesNotExist:
        # Log the error and return a 404 response if the HRContact object is not found
        logger.error(f"HRContact with name {identity} and branch {branch} not found.")
        return Response({'detail': 'HRContact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except PermissionDenied:
        # Log the permission denied error and return a 403 response
        logger.error("Permission denied for user with ID: {}".format(request.user.id))
        return Response({'detail': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
