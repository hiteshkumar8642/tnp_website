from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from interface.models import AppliedCompany, Company, UserProfile
import pandas as pd
import logging
from django.http import HttpResponse

# Configure logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def DownloadAppliedStudentsListView(request, company_id):
    try:
        # Get the user's role from the UserProfile model
        user_profile = get_object_or_404(UserProfile, user=request.user)

        # Check if the role is in the allowed list
        if user_profile.role in [1, 2]:
            return Response({'detail': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        # Proceed if the user is authorized
        company = get_object_or_404(Company, id=company_id)
        applications = AppliedCompany.objects.filter(application_id__company_id=company).select_related('user_id', 'application_id')

        # Prepare data for Excel
        data = []
        for application in applications:
            user_details = application.user_id.userdetails
            application_data = application.application_id
            data.append({
                "Username": application.user_id.username,
                "First Name": application.user_id.first_name,
                "Last Name": application.user_id.last_name,
                "Email": application.user_id.email,
                "Department": user_details.department,
                "Mobile": user_details.mobile,
                "Backlogs": user_details.backlogs,
                "Graduation CGPA": user_details.graduation_cgpa,
                "Twelfth Percentage": user_details.twelfth_percentage,
                "Tenth Percentage": user_details.tenth_percentage,
                "Current CGPA": user_details.current_cgpa,
                "Position": application_data.position,
                "Applied On": application.created.strftime('%Y-%m-%d %H:%M:%S'),
                "Application Status": application.is_selected,
            })

        if not data:
            return Response({'detail': 'No applied students found for this company.'}, status=status.HTTP_204_NO_CONTENT)

        # Create a DataFrame and generate Excel response
        df = pd.DataFrame(data)
        response = HttpResponse(content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = f'attachment; filename="{company.name}_applied_students.xlsx"'
        df.to_excel(response, index=False)

        return response

    except UserProfile.DoesNotExist:
        logger.error("User profile not found.")
        return Response({'detail': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Company.DoesNotExist:
        logger.error("Company not found.")
        return Response({'detail': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
