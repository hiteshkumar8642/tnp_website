from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from interface.models import Shared_HR_contact, HRContact
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TransferContactView(request):
    try:
        hr_id = request.data.get('hr_id')
        
        if not hr_id:
            return Response({'detail': 'HR ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

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
        
        # Delete the original Shared_HR_contact object
        sh_hr_obj.delete()
        
        return Response({'message': 'Contact transferred successfully.'}, status=status.HTTP_201_CREATED)

    except Shared_HR_contact.DoesNotExist:
        # Log the error and return a 404 response if the Shared_HR_contact object is not found
        logger.error(f"Shared_HR_contact with id {hr_id} not found.")
        return Response({'detail': 'Shared_HR_contact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 500 Internal Server Error status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
