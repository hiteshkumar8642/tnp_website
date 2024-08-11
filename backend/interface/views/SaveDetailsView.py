
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth
from interface. forms import createUserForm , CollegeRegistrationForm
from django.views.decorators.csrf import csrf_exempt

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from  interface.tokens import account_activation_token
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,UserProfile,UserDetails,CollegeCourse,College,Course
from dashboard.serializers import UserDetailsSerializer, UserProfileSerializer
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordResetView
from django.contrib.messages.views import SuccessMessageMixin

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import json
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

import logging

logger = logging.getLogger(__name__)
from django.contrib.auth.forms import PasswordResetForm
from django.utils.translation import gettext_lazy as _

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SaveDetailsView(request):
    try:
       if ('resume'  in request.FILES and 'photo' in request.FILES and 'graduation-marksheet' in request.FILES and '10th-marksheet' in request.FILES and '12th-marksheet' in request.FILES) :
            user = request.user
            resume = request.FILES['resume']
            photo = request.FILES['photo']
            backlogs = request.POST.get('backlogs')
            graduation_marksheet = request.FILES['graduation-marksheet']
            graduation_cgpa = request.POST.get('graduation-cgpa')
            twelfth_marksheet = request.FILES['12th-marksheet']
            twelfth_percentage = request.POST.get('12th-percentage')
            tenth_marksheet = request.FILES['10th-marksheet']
            tenth_percentage = request.POST.get('10th-percentage')
            current_cgpa = request.POST.get('graduation-cgpa')
            other_website_link = request.POST.get('website')
            leetcode_profile = request.POST.get('leetcode')
            codechef_profile = request.POST.get('codechef')
            codeforces_profile = request.POST.get('codeforces')
            github_profile = request.POST.get('github')
            portfolio_link = request.POST.get('portfolio')
            linkedin_profile = request.POST.get('linkedin')
            department = request.POST.get('department')
            gap_after_twelfth = request.POST.get('gap_after_twelfth')
            gap_after_graduation = request.POST.get('gap_after_graduation')
            mobile = request.POST.get('mobile')
            branch = request.POST.get('branch')
            
            print(branch)

            brnc= Course.objects.get(degree=branch)
            clgbrnc=CollegeCourse.objects.get(college=request.user.userprofile.college, course=brnc)
            user_db_obj = UserDetails(user = user,college_branch = clgbrnc,resume = resume, photo = photo , backlogs = backlogs , graduation_marksheet = graduation_marksheet , graduation_cgpa = graduation_cgpa , twelfth_marksheet = twelfth_marksheet , tenth_marksheet = tenth_marksheet ,twelfth_percentage = twelfth_percentage , tenth_percentage = tenth_percentage , current_cgpa = current_cgpa , other_website_link = other_website_link , leetcode_profile= leetcode_profile , codechef_profile = codechef_profile , codeforces_profile = codeforces_profile , github_profile = github_profile , portfolio_link  = portfolio_link , linkedin_profile = linkedin_profile , department = department , gap_after_graduation = gap_after_graduation , mobile = mobile , gap_after_twelfth = gap_after_twelfth)
            user_db_obj.save() 
            
            return Response({'message':'Userdetails Saved Successfully.'},status=status.status.HTTP_201_CREATED)
    
    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    