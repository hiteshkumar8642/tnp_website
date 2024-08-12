from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from dashboard.models import Shared_Company
from rest_framework.views import APIView
from dashboard.serializers import SharedCompanySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging



# Configure logging
logger = logging.getLogger(__name__)

@permission_classes([IsAuthenticated])
class SharedCompanyModifyView(APIView):
    def post(self, request):
        try:
            # Collect data from the POST request
            company_name = request.POST.get('companyName')
            company_email = request.POST.get('companyEmail')
            company_contact = request.POST.get('contactNumber')
            ctc = request.POST.get('ctc')
            college_visited = request.POST.get('collegeVisited')
            type = request.POST.get('type')
            
            location = request.POST.get('location')

            # Get the current authenticated user
            user = request.user

            role = user.userprofile.role
            print(role)
            # Retrieve the user's college branch3ZZ6
            branch = user.userdetails.college_branch

            # Log the college_visited value for debugging purposes
            logger.debug(f"College Visited: {college_visited}")

            company_serializer = Shared_Company(company_name=company_name,company_email=company_email,company_contact=company_contact,ctc=ctc,college_visited=college_visited,type=type,location=location,college_branch=branch,user=user)
            company_serializer.save()

            return Response({"message": 'Submitted Successfully'}, status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist:
            # Handle the case where user details or college branch don't exist
            logger.error(f"UserDetails or CollegeBranch not found for user ID: {user.id}")
            return Response({'detail': 'User details not found.'}, status=status.HTTP_404_NOT_FOUND)

        except DatabaseError as db_err:
            # Handle any database-related errors
            logger.error(f"Database error: {str(db_err)}")
            return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            # Log any unexpected exceptions
            logger.error(f"Unexpected error: {str(e)}")
            return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
