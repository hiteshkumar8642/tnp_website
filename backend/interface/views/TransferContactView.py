from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import Shared_HR_contact,HRContact
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
def TransferContactView(request):
    try:
        hr_id = request.POST.get('HR-id')
        # Retrieve the Shared_HR_contact object based on the provided hr_id
        sh_hr_obj = get_object_or_404(Shared_HR_contact, id=hr_id)

        # Extract the necessary fields from the Shared_HR_contact object
        name = sh_hr_obj.name
        company = sh_hr_obj.company_name
        email = sh_hr_obj.email
        contact = sh_hr_obj.contact_number
        linkedin = sh_hr_obj.linkedin_id
        clg_branch = sh_hr_obj.college_branch
        # Create a new HRContact object with the extracted data

        hr_cont_obj = HRContact.objects.create(
            name=name,
            mail_id=email,
            mobile_numbers=contact,
            linkedin=linkedin,
            college_branch=clg_branch
        )

        hr_cont_obj.save()
        # Return a success response with an HTTP 201 Created status
        return Response({'message': 'Contact transferred successfully.'}, status=status.HTTP_201_CREATED)

    except Shared_HR_contact.DoesNotExist:
        # Log the error and return a 404 response if the Shared_HR_contact object is not found
        logger.error(f"Shared_HR_contact with id {hr_id} not found.")
        return Response({'detail': 'Shared_HR_contact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    