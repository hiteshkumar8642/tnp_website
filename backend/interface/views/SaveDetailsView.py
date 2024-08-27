from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User, auth
from interface.models import CollegeCourse, Course, UserDetails
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SaveDetailsView(request):
    try:
        # Ensure all required files are provided
        required_files = ['resume', 'photo', 'graduation_marksheet', 'tenth_marksheet', 'twelfth_marksheet']
        if all(file in request.FILES for file in required_files):
            user = request.user
            resume = request.FILES['resume']
            photo = request.FILES['photo']
            backlogs = request.POST.get('backlogs')
            graduation_marksheet = request.FILES['graduation_marksheet']
            graduation_cgpa = request.POST.get('graduation_cgpa')
            twelfth_marksheet = request.FILES['twelfth_marksheet']
            twelfth_percentage = request.POST.get('twelfth_percentage')
            tenth_marksheet = request.FILES['tenth_marksheet']
            tenth_percentage = request.POST.get('tenth_percentage')
            current_cgpa = request.POST.get('current_cgpa')
            other_website_link = request.POST.get('other_website_link')
            leetcode_profile = request.POST.get('leetcode_profile')
            codechef_profile = request.POST.get('codechef_profile')
            codeforces_profile = request.POST.get('codeforces_profile')
            github_profile = request.POST.get('github_profile')
            portfolio_link = request.POST.get('portfolio_link')
            linkedin_profile = request.POST.get('linkedin_profile')
            department = request.POST.get('department')
            gap_after_twelfth = request.POST.get('gap_after_twelfth')
            gap_after_graduation = request.POST.get('gap_after_graduation')
            mobile = request.POST.get('mobile')
            branch = request.POST.get('branch')
            
            # Get course and college branch information
            brnc = Course.objects.get(degree=branch)
            clgbrnc = CollegeCourse.objects.get(college=user.userprofile.college, course=brnc)
            
            # Create and save UserDetails object
            user_db_obj = UserDetails(
                user=user, college_branch=clgbrnc, resume=resume, photo=photo, backlogs=backlogs,
                graduation_marksheet=graduation_marksheet, graduation_cgpa=graduation_cgpa,
                twelfth_marksheet=twelfth_marksheet, tenth_marksheet=tenth_marksheet,
                twelfth_percentage=twelfth_percentage, tenth_percentage=tenth_percentage,
                current_cgpa=current_cgpa, other_website_link=other_website_link,
                leetcode_profile=leetcode_profile, codechef_profile=codechef_profile,
                codeforces_profile=codeforces_profile, github_profile=github_profile,
                portfolio_link=portfolio_link, linkedin_profile=linkedin_profile,
                department=department, gap_after_graduation=gap_after_graduation,
                mobile=mobile, gap_after_twelfth=gap_after_twelfth
            )
            user_db_obj.save()
            
            return Response({'message': 'User details saved successfully.'}, status=status.HTTP_201_CREATED)

        else:
            return Response({'error': 'Required files are missing.'}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
