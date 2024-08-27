from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView

from interface.models import Shared_Company
from interface.serializers import SharedCompanySerializer

# Configure logging
logger = logging.getLogger(__name__)

@permission_classes([IsAuthenticated])
class SharedCompanyListView(APIView):
    def get(self, request):
        try:
            # Retrieve the current user and their college branch
            user = request.user
            branch = user.userdetails.college_branch

            # Check if the user has the appropriate role to access this data
            if user.userprofile.role in [3, 4]:
                # Retrieve company contacts for the user's college branch
                company_contacts = Shared_Company.objects.filter(college_branch=branch)

                # If company_contacts is empty, return 204 No Content
                if not company_contacts.exists():
                    return Response(status=status.HTTP_204_NO_CONTENT)

                # Serialize and return the company contacts
                company_serializer = SharedCompanySerializer(company_contacts, many=True)
                return Response(company_serializer.data, status=status.HTTP_200_OK)
            else:
                # Return 403 Forbidden for unauthorized access
                return Response({'message': 'Unauthorized Access'}, status=status.HTTP_403_FORBIDDEN)

        except ObjectDoesNotExist:
            # Log and return a 404 error if user details or profiles are missing
            logger.error(f"UserDetails or UserProfile not found for user ID: {user.id}")
            return Response({'detail': 'User details not found.'}, status=status.HTTP_404_NOT_FOUND)

        except DatabaseError as db_err:
            # Log and return a 500 error for any database issues
            logger.error(f"Database error: {str(db_err)}")
            return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            # Log and return a 500 error for any unexpected exceptions
            logger.error(f"Unexpected error: {str(e)}")
            return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
