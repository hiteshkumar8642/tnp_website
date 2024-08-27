from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import Shared_HR_contact, HRContact
from rest_framework.serializers import Serializer
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def HRContactModifyView(request):
    try:
        # Extract data from the POST request
        name = request.data.get('name')
        company_name = request.data.get('companyName')
        email = request.data.get('email')
        contact_number = request.data.get('contactNumber')
        linkedin_id = request.data.get('linkedinId')
        gender = request.data.get('gender')

        # Get the current authenticated user
        user = request.user
        role = user.userprofile.role

        if role == 2:
            # Handle role 2 (e.g., student) case
            serializer = Shared_HR_contact(
                name=name,
                gender=gender,
                company_name=company_name,
                email=email,
                contact_number=contact_number,
                linkedin_id=linkedin_id,
                college_branch=user.userdetails.college_branch,
                user=user
            )
            serializer.save()
            return Response({"message": "Shared HR contact created successfully."}, status=status.HTTP_201_CREATED)
        
        elif role in [3, 4]:
            # Handle role 3 or 4 (e.g., HR) case
            serializer = HRContact(
                name=name,
                mail_id=email,
                gender=gender,
                mobile_numbers=contact_number,
                linkedin=linkedin_id,
                college_branch=user.userdetails.college_branch
            )
            serializer.save()
            return Response({"message": "HR contact created successfully."}, status=status.HTTP_201_CREATED)
        
        # If the user role does not match any of the specified roles, return a 403 Forbidden response
        return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log the exception for debugging purposes
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
