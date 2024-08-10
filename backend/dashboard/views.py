from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College
from django.http import HttpResponse
from dashboard.models import Course,Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,Company,AppliedCompany,CallHistory,CollegeCourse,Application,UserProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from rest_framework import viewsets
from .models import College
from rest_framework.views import APIView
from .serializers import UserSerializer, CollegeSerializer,CourseSerializer,CollegeCourseSerializer,CompanySerializer,SharedCompanySerializer,SharedHRContactSerializer,HRContactSerializer,CallHistorySerializer,UserDetailsSerializer,ApplicationSerializer,AppliedCompanySerializer,UserProfileSerializer,AnnouncementSerializer

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
import logging

# Configure logging
logger = logging.getLogger(__name__)

# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken

class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CollegeCourseViewSet(viewsets.ModelViewSet):
    queryset = CollegeCourse.objects.all()
    serializer_class = CollegeCourseSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class Shared_CompanyViewSet(viewsets.ModelViewSet):
    queryset = Shared_Company.objects.all()
    serializer_class = SharedCompanySerializer

class Shared_HRViewSet(viewsets.ModelViewSet):
    queryset = Shared_HR_contact.objects.all()
    serializer_class = SharedHRContactSerializer

class HRContactViewSet(viewsets.ModelViewSet):
    queryset = HRContact.objects.all()
    serializer_class = HRContactSerializer

class CallHistoryViewSet(viewsets.ModelViewSet):
    queryset = CallHistory.objects.all()
    serializer_class = CallHistorySerializer

class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class AppliedCompanyViewSet(viewsets.ModelViewSet):
    queryset = AppliedCompany.objects.all()
    serializer_class = AppliedCompanySerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer




#-------------------------------------------------------------------------------------------------------------------------

# APIs 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def application(request):
    try:
        user = request.user
        # Attempt to retrieve all Application objects, ordered by 'last_date'
        applications = Application.objects.filter(college_branch=user.userdetails.college_branch).order_by('last_date')
        
        # Serialize the retrieved applications
        application_serializer = ApplicationSerializer(applications, many=True)
        
        # Return a successful response with serialized data
        return Response(application_serializer.data,status=status.HTTP_200_OK)
    
    except ObjectDoesNotExist:
        # Handle case where the Application object doesn't exist
        logger.error("Application objects not found.")
        return Response({'detail': 'Applications not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Handle database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        # Handle any other unspecified exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_announcements(request):
    try:
        user = request.user

        # Filter announcements based on the user's college branch
        announcements = Announcement.objects.filter(college_branch=user.userdetails.college_branch)

        # If no announcements are found, return an appropriate message
        if not announcements.exists():
            return Response({'error': 'No Announcement'}, status=status.HTTP_404_NOT_FOUND)

        # Serialize and return the announcements
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist as e:
        # Log the error and return a 404 response
        logger.error(f"Object not found error: {str(e)}")
        return Response({'detail': 'Requested object not found.', 'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log the database error and return a 500 response
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'Database error occurred.', 'error': str(db_err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any other unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def appliedCompany_api(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the Application object associated with the user
        application = AppliedCompany.objects.filter(user_id=user.id)

        # Serialize the Application object using AppliedCompanySerializer
        appliedcompanyserializer = AppliedCompanySerializer(application,many=True)

        # Return the serialized data with an HTTP 200 OK status
        return Response(appliedcompanyserializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Log the error and return a 404 response if the Application object is not found
        logger.error("Application not found for the user with ID: {}".format(user.id))
        return Response({'detail': 'Application not found for the user.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log the database error and return a 500 response
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any other unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def HandleHRContactAPI(request):
    try:
        # Extract data from the POST request
        print(request.POST)
        name = request.POST.get('name')
        company_name = request.POST.get('companyName')
        email = request.POST.get('email')
        contact_number = request.POST.get('contactNumber')
        linkedin_id = request.POST.get('linkedinId')
        
        print(name,company_name,email,contact_number,linkedin_id)

        # Get the current authenticated user
        users = request.user
        role = users.userprofile.role

        print(users)
        if role==1 or role==2:
            print("Student")
            serializer = Shared_HR_contact(name=name, company_name=company_name, email=email, contact_number=contact_number,linkedin_id=linkedin_id,college_branch=users.userdetails.college_branch,user=users)
            serializer.save()
            return Response({"message": "HR contact created successfully."}, status=status.HTTP_201_CREATED)
        
        elif role==3 or role==4:
            print("HRContact")
            serializer = HRContact(name=name,  mail_id=email, mobile_numbers=contact_number,linkedin=linkedin_id,college_branch=users.userdetails.college_branch)
            serializer.save()
            return Response({"message": "HR contact created successfully ."}, status=status.HTTP_201_CREATED)


    except Exception as e:
        # Log the exception for debugging purposes
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@permission_classes([IsAuthenticated])
class common_company_form_api(APIView):
    def post(self, request):
        try:
            # Collect data from the POST request
            company_name = request.POST.get('company-name')
            company_email = request.POST.get('company-email')
            company_contact = request.POST.get('company-contact')
            ctc = request.POST.get('ctc')
            college_visited = request.POST.get('clg-vis')
            type = request.POST.get('intern1')
            is_company = request.POST.get('is_company')
            location = request.POST.get('location-id')

            # Get the current authenticated user
            user = request.user

            role = user.userprofile.role
            print(role)
            # Retrieve the user's college branch3ZZ6
            branch = user.userdetails.college_branch

            # Log the college_visited value for debugging purposes
            logger.debug(f"College Visited: {college_visited}")

            company_serializer = Shared_Company(company_name=company_name,company_email=company_email,company_contact=company_contact,ctc=ctc,college_visited=college_visited,type=type,is_company=is_company,location=location,college_branch=branch,user=user)
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



@permission_classes([IsAuthenticated])
class handle_comapany_contact_api(APIView):
    def get(self, request):
        try:
            # Retrieve the current user and their college branch
            user = request.user
            branch = user.userdetails.college_branch

            # Check if the user has the appropriate role to access this data
            if user.userprofile.role == 3 or user.userprofile.role == 4:
                # Retrieve company contacts for the user's college branch
                company_contacts = Shared_Company.objects.filter(college_branch=branch)

                # Check if there are any company contacts
                if not company_contacts.exists():
                    return Response({'error': 'Company List Empty'}, status=status.HTTP_404_NOT_FOUND)

                # Serialize the company contacts
                company_serializer = SharedCompanySerializer(company_contacts, many=True)
                return Response(company_serializer.data, status=status.HTTP_200_OK)
            else:
                # Return 403 Forbidden for unauthorized access
                return Response({'message': "Unauthorized Access"}, status=status.HTTP_403_FORBIDDEN)

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


## Transfer Contact API need to be done shared hr/company db
## dlt ALL

## ALL STUDENT LIST
## ADD NEW APPLICATION

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def PrintHRListAPI(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Fetch HR contacts for the user's college branch with no assignment
            hrContact = HRContact.objects.filter(college_branch=user.userdetails.college_branch, assigned=None)

            # Check if hrContact is empty
            if not hrContact.exists():
                return Response({'error': 'HR Contact List is empty.'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize and return the HR contacts
            hrcontactserializer = HRContactSerializer(hrContact, many=True)
            return Response(hrcontactserializer.data, status=status.HTTP_200_OK)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({'message': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    except ObjectDoesNotExist:
        # Log the error if the UserProfile does not exist
        logger.error(f"UserProfile not found for user ID: {user.id}")
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log any database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MyHRListAPI(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Fetch HR contacts for the user's college branch assigned to the user
            hrContact = HRContact.objects.filter(college_branch=user.userdetails.college_branch, assigned=user)

            # Check if hrContact is empty
            if not hrContact.exists():
                return Response({'error': 'No HR Contacts'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize and return the HR contacts
            hrcontactserializer = HRContactSerializer(hrContact, many=True)
            return Response(hrcontactserializer.data, status=status.HTTP_200_OK)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({'message': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    except ObjectDoesNotExist:
        # Log the error if the UserProfile does not exist
        logger.error(f"UserProfile not found for user ID: {user.id}")
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log any database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Shared Company list by the helper only for TNPs/TPOs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SharedCompanyListAPI(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Fetch shared companies for the user's college branch
            sharedcompany = Shared_Company.objects.filter(college_branch=user.userdetails.college_branch)

            # Check if sharedcompany is empty
            if not sharedcompany.exists():
                return Response({'error': 'No Shared Companies found.'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize and return the shared companies
            sharedcompany_serializer = SharedCompanySerializer(sharedcompany, many=True)
            return Response(sharedcompany_serializer.data, status=status.HTTP_200_OK)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({'message': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    except ObjectDoesNotExist:
        # Log the error if the UserProfile does not exist
        logger.error(f"UserProfile not found for user ID: {user.id}")
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log any database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Shared HR List only for TNPs/TPOs
@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def SharedHRListAPI(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Fetch shared HR Contacts for the user's college branch
            sharedhr = Shared_HR_contact.objects.filter(college_branch=user.userdetails.college_branch)

            # Check if sharedcompany is empty
            if not sharedhr.exists():
                return Response({'error': 'No Shared Companies found.'}, status=status.HTTP_404_NOT_FOUND)

            # Serialize and return the shared companies
            sharedhr_serializer = SharedHRContactSerializer(sharedhr, many=True)
            return Response(sharedhr_serializer.data, status=status.HTTP_200_OK)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({'message': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

    except ObjectDoesNotExist:
        # Log the error if the UserProfile does not exist
        logger.error(f"UserProfile not found for user ID: {user.id}")
        return Response({'detail': 'UserProfile not found.'}, status=status.HTTP_404_NOT_FOUND)

    except DatabaseError as db_err:
        # Log any database-related errors
        logger.error(f"Database error: {str(db_err)}")
        return Response({'detail': 'A database error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_list_api(request):
    try:
        user = request.user
        
        # Retrieve the user's role from UserProfile
        role = UserProfile.objects.get(user=user).role

        # Check if the user has the required role
        if role==3 or role==4:
            print("dev")
            userdetails = UserDetails.objects.filter(college_branch=user.userdetails.college_branch)
            print("vrat")

            # Return 403 Forbidden for unauthorized access
            user_details_serializer = UserDetailsSerializer(userdetails,many=True)
            return Response(user_details_serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"message":False},status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
            return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)    



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddAnnouncementAPI(request):
    try:
        # Get the current authenticated user and their role
        user = request.user
        
        role = user.userprofile.role

        college_branch = user.userdetails.college_branch
        print(college_branch)

        announcement = request.POST.get('announcement')

        # Check if the user has the required role
        if role == 3 or role == 4:
            # Prepare data for serialization
            # data = {
            #     'user': user,  # Pass the user ID for the serializer
            #     'announcement': announcement,
            # }
            # Validate and save the announcement using a serializer
            announcement_serial = Announcement.objects.create(user=user,announcement=announcement,college_branch=college_branch)
            announcement_serial.save()
            print("vrat")
            return Response({"message": True}, status=status.HTTP_201_CREATED)

        else:
            # Return 403 Forbidden for unauthorized access
            return Response({"message": False}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An unexpected error occurred.', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def deleteALL_SharedHRContacts_API(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the role of the user
        role = user.userprofile.role
        print(role)
        # Check if the user has the appropriate role (3 or 4)
        if role == 3 or role == 4:
            # Get the college branch of the user
            branch = user.userdetails.college_branch
            print(branch)
            # Delete all Shared_HR_contact objects associated with the user's branch
            Shared_HR_contact.objects.filter(college_branch=branch).delete()

            # Return a success message with an HTTP 200 OK status
            return Response({'message': 'Deleted'}, status=status.HTTP_200_OK)
        else:
            # Return a failure message with an HTTP 400 Bad Request status if the user role is not authorized
            return Response({"message": False}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
  
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AssignMeAPI(request):
    try:
        # Check if the user is authenticated and has the appropriate role (3 or 4)
        if request.user.userprofile.role in [3, 4]:
            user = request.user
            identity = request.POST.get('HR-identity')

            # Retrieve the college branch of the user
            branch = user.userdetails.college_branch

            # Get the HRContact object with the specified name and college branch
            hr_contact = get_object_or_404(HRContact, id=identity, college_branch=branch)
        
            # Assign the HRContact object to the current user
            hr_contact.assigned = user
            hr_contact.save()

            # Return a success response with an HTTP 200 OK status
            return Response({'message': 'HR contact assigned successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'NOT Elligble to Access it'},status=status.HTTP_401_UNAUTHORIZED)

    except HRContact.DoesNotExist:
        # Log the error and return a 404 response if the HRContact object is not found
        logger.error(f"HRContact with name {identity} and branch {branch} not found.")
        return Response({'detail': 'HRContact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except PermissionDenied:
        # Log the permission denied error and return a 403 response
        logger.error("Permission denied for user with ID: {}".format(request.user.id))
        return Response({'detail': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CallHistoryAPI(request):
    try:
        # Retrieve the authenticated user
        user = request.user
        
        # Retrieve the user's branch from UserDetails model
        branch = user.userdetails.college_branch

        # Retrieve the user's role from UserProfile model
        role = UserProfile.objects.get(user=user).role

        # Check if the user's role is either 3 or 4
        if role == 3 or role == 4:
            # Retrieve call history for the user's branch
            callhistory = CallHistory.objects.filter(college_branch=branch)
            print("Retrieving call history")
            
            # Serialize the call history data
            callhistory_serializer = CallHistorySerializer(callhistory, many=True)
            print("Serialization complete")
            
            # Return the serialized data with a 200 OK status
            return Response(callhistory_serializer.data, status=status.HTTP_200_OK)

        # If the role is not 3 or 4, return a 403 Forbidden response
        return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    except UserProfile.DoesNotExist:
        # Handle the case where the user's profile is not found
        return Response({'detail': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Handle any other exceptions and return a 400 Bad Request response
        print(f"Error occurred: {str(e)}")
        return Response({'detail': 'An error occurred'}, status=status.HTTP_400_BAD_REQUEST)



######################################### CURRENTLY NOT WORKING ####################################################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TransferContactAPI(request):
    try:
        hr_id = request.POST.get('HR-id')
        # Retrieve the Shared_HR_contact object based on the provided hr_id
        sh_hr_obj = get_object_or_404(Shared_HR_contact, id=hr_id)

        # Extract the necessary fields from the Shared_HR_contact object
        name = sh_hr_obj.name
        company = sh_hr_obj.company_name
        email = sh_hr_obj.email
        contact = sh_hr_obj.contact_number
        linkedin = sh_hr_obj.linkedin_id
        clg_branch = sh_hr_obj.college_branch
        print("Company : ",company)
        print(contact)
        # Create a new HRContact object with the extracted data

        hr_cont_obj = HRContact.objects.create(
            name=name,
            mail_id=email,
            mobile_numbers=contact,
            linkedin=linkedin,
            college_branch=clg_branch
        )

        hr_cont_obj.save()
        print("Devvrat")
        # Return a success response with an HTTP 201 Created status
        return Response({'message': 'Contact transferred successfully.'}, status=status.HTTP_201_CREATED)

    except Shared_HR_contact.DoesNotExist:
        # Log the error and return a 404 response if the Shared_HR_contact object is not found
        logger.error(f"Shared_HR_contact with id {hr_id} not found.")
        return Response({'detail': 'Shared_HR_contact not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log any unexpected exceptions and return a generic error response with an HTTP 400 Bad Request status
        logger.error(f"Unexpected error: {str(e)}")
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    



    


