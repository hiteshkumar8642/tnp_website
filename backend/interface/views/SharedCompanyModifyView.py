from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView

from interface.models import Shared_Company
from interface.serializers import SharedCompanySerializer

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
            company_type = request.POST.get('type')
            location = request.POST.get('location')

            # Check for required fields
            if not all([company_name, company_email, company_contact, ctc, college_visited, company_type, location]):
                return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Get the current authenticated user and their role
            user = request.user
            role = user.userprofile.role
            branch = user.userdetails.college_branch

            logger.debug(f"User role: {role}")
            logger.debug(f"College Visited: {college_visited}")

            # Check if the user has the appropriate role to modify company data
            if role not in [2]:
                return Response({'message': 'Unauthorized Access'}, status=status.HTTP_403_FORBIDDEN)

            # Create a new Shared_Company object and save it
            shared_company = Shared_Company(
                company_name=company_name,
                company_email=company_email,
                company_contact=company_contact,
                ctc=ctc,
                college_visited=college_visited,
                type=company_type,
                location=location,
                college_branch=branch,
                user=user
            )

            shared_company.save()
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
