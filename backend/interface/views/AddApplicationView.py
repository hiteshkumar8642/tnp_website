from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import Application
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
def AddApplicationView(request):
    try:
        # Get the current authenticated user and their role
        user = request.user
        
        role = user.userprofile.role

        college_branch = user.userdetails.college_branch
        print(college_branch)


        # Check if the user has the required role
        if role == 3 or role == 4:
            # Prepare data for serialization
            # data = {
            #     'user': user,  # Pass the user ID for the serializer
            #     'announcement': announcement,
            # }
            # Validate and save the announcement using a serializer
            application = Application(
                created=request.POST.get('created'),  # auto_now_add=True, set automatically on save
                updated=request.POST.get('updated'),  # auto_now=True, set automatically on save
                last_date=request.POST.get('last_date'),
                position=request.POST.get('position'),
                company_id_id=request.POST.get('company_id'),  # assuming `company_id` is passed as an ID
                predicted_visit_date=request.POST.get('predicted_visit_date'),
                twelfth_marks_eligibility=request.POST.get('twelfth_marks_eligibility'),
                tenth_marks_eligibility=request.POST.get('tenth_marks_eligibility'),
                job_description=request.FILES.get('job_description'),
                is_intern=request.POST.get('is_intern') == 'on',  # convert checkbox to boolean
                is_ppo=request.POST.get('is_ppo') == 'on',
                is_fte=request.POST.get('is_fte') == 'on',
                is_spp=request.POST.get('is_spp') == 'on',
                is_sip=request.POST.get('is_sip') == 'on',
                twelfth_gap=request.POST.get('twelfth_gap'),
                graduation_gap=request.POST.get('graduation_gap'),
                backlogs=request.POST.get('backlogs'),
                graduation_marks=request.POST.get('graduation_marks'),
                current_cgpa=request.POST.get('current_cgpa'),
                college_branch_id=request.POST.get('college_branch'),  # assuming `college_branch` is passed as an ID
            )
            application.save()
            
            # Handling ManyToManyField
            allowed_branch_ids = request.POST.getlist('allowed_branch')
            application.allowed_branch.set(allowed_branch_ids)
            return Response({"message": True}, status=status.HTTP_201_CREATED)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({"message": False}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)