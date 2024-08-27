from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from interface.models import Application, Company
import logging

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddApplicationView(request):
    try:
        # Get the current authenticated user
        user = request.user
        role = user.userprofile.role
        college_branch = user.userdetails.college_branch

        # Retrieve company object
        company_id = request.POST.get('company_id')
        company = Company.objects.get(id=company_id)

        # Check if the user has the required role
        if role in [3, 4]:
            # Create and save the application object
            application = Application(
                last_date=request.POST.get('last_date'),
                position=request.POST.get('position'),
                company_id=company,
                predicted_visit_date=request.POST.get('predicted_visit_date'),
                twelfth_marks_eligibility=request.POST.get('twelfth_marks_eligibility'),
                tenth_marks_eligibility=request.POST.get('tenth_marks_eligibility'),
                job_description=request.FILES.get('job_description'),
                is_intern=request.POST.get('is_intern') == 'true',
                is_ppo=request.POST.get('is_ppo') == 'true',
                is_fte=request.POST.get('is_fte') == 'true',
                is_spp=request.POST.get('is_spp') == 'true',
                is_sip=request.POST.get('is_sip') == 'true',
                twelfth_gap=request.POST.get('twelfth_gap'),
                graduation_gap=request.POST.get('graduation_gap'),
                backlogs=request.POST.get('backlogs'),
                graduation_marks=request.POST.get('graduation_marks'),
                current_cgpa=request.POST.get('current_cgpa'),
                college_branch=college_branch,
            )
            application.save()

            # Handle ManyToManyField
            allowed_branch_ids = request.POST.getlist('allowed_branch')
            application.allowed_branch.set(allowed_branch_ids)
            
            return Response({"message": "Application created successfully."}, status=status.HTTP_201_CREATED)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({"message": "You do not have permission to create an application."}, status=status.HTTP_403_FORBIDDEN)

    except Company.DoesNotExist:
        # Log and return 404 if the Company object is not found
        logger.error(f"Company with ID {company_id} not found.")
        return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log and return 500 for unexpected errors
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
