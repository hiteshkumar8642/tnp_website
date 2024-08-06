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

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({"error": "Please provide both username and password"}, status=status.HTTP_400_BAD_REQUEST)

    users = authenticate(request, username=username, password=password)
    
    if users is not None:
        details = UserDetails.objects.filter(user=users)
        profile = UserProfile.objects.filter(user=users)
        app_com = AppliedCompany.objects.filter(user_id=users.id)
        app_obj = app_com[0].application_id
        comp_obj = app_obj.company_id
        company = Company.objects.filter(id=comp_obj.id)
        hr_cnt = HRContact.objects.filter(company_id=comp_obj.id)
        announcement = Announcement.objects.all().order_by('created')[:10]
        print(announcement)
        s1 = UserSerializer(users)
        s2 = UserDetailsSerializer(details,many=True)
        s3 = UserProfileSerializer(profile,many=True)
        s4 = CompanySerializer(company,many=True)
        s5 = HRContactSerializer(hr_cnt,many=True)
        announcement_serializer = AnnouncementSerializer(announcement, many=True)
        print(announcement_serializer)
        if profile[0].role==3 or profile[0].role==4 :
            return Response({"message": "Login successful", "user": s1.data, "detail":s2.data ,"role":s3.data,"Company":s4.data,"HRContact":s5.data,"Announcement":announcement_serializer.data}, status=status.HTTP_200_OK)
        if profile[0].role==1:
            return Response({"message": "Login successful", "user": s1.data, "detail":s2.data ,"role":s3.data,"Company":s4.data,"Announcement":announcement_serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_announcements(request):
    try:
        print(" hello")
        user = request.user
        print(user.userdetails.college_branch)
        announcements = Announcement.objects.filter(college_branch=user.userdetails.college_branch)
        print(announcements)
        if announcements is None:
            print("hii")
            return Response({'error': 'No Announcement'},status=status.HTTP_200_BAD_REQUEST)
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def application(request):
    try:
        application = Application.objects.all().order_by('last_date')
        application_serializer = ApplicationSerializer(application, many=True)
        return Response({'applications': application_serializer.data})
    except Exception as e:
        return Response({'detail': 'An error occurred.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signup(request):
    serial = UserSerializer(data=request.data)
    if user.is_valid():
        user = serial.save()
        username = request.data.get('username')
        password = request.data.get('password')
        details = UserDetails.objects.filter(user=user)
        profile = UserProfile.objects.filter(user=user)
        user_serializer = UserSerializer(user)
        details_serializer = UserDetailsSerializer(details, many=True)
        profile_serializer = UserProfileSerializer(profile, many=True)

        return Response({"message": "Signup successful","user": user_serializer.data,"detail": details_serializer.data,"role": profile_serializer.data
        }, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Somethind went Wrong!"}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def dashboard(request):
#     announcement = Announcement.objects.all().order_by('created')[:10]
#     application = Application.objects.all().order_by('last_date')
#     announcement_serializer = AnnouncementSerializer(announcement, many=True)
#     application_serializer = ApplicationSerializer(application, many=True)
#     return Response({
#         'announcements': announcement_serializer.data,
#         'applications': application_serializer.data
#     })

def dashboard(request):
    if request.user.is_authenticated:
        announcement=Announcement.objects.all().order_by('created')[:10]
        application=Application.objects.all().order_by('last_date')
        return render(request,'dashboard/companies.html',{'announcement':announcement , 'application':application})
    else:
        return render(request,'landing_page/home.html')

def appliedCompany(request):
    if request.user.is_authenticated:
        announcement=Announcement.objects.all().order_by('created')[:10]
        application=AppliedCompany.objects.filter(user_id=request.user)
        return render(request,'dashboard/applied_company.html',{'announcement':announcement , 'application':application})
    else:
        return render(request,'landing_page/home.html')

def apply(request,j_id):
    if request.user.is_authenticated:
        appli=Application.objects.get(id=j_id)
        app=AppliedCompany(user_id=request.user,application_id=appli)
        app.save()
        return dashboard(request)
    else:
        return render(request,'landing_page/home.html')


# company_contact_handler
def handle_comapany_contact(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==2 : 
            if request.method == 'POST':
                company_name = request.POST.get('company-name')
                comp_email = request.POST.get('company-email')
                comp_contact = request.POST.get('company-number')
                ctc = request.POST.get('ctc')
                clg_visited = request.POST.get('clg-vis')
                selected_options = request.POST.getlist('intern1')
                is_company = request.POST.get('is_company')
                locations = request.POST.get('location-id')
                users = request.user
                branch = users.userdetails.college_branch

                res = Shared_Company.objects.filter(company_name=company_name).exists()
                if res==True:
                    return render(request,'dashboard/company_contact.html',{'msg':'Company Already Exist !!!'})
                else:
                    comp_db_obj = Shared_Company(company_name=company_name,company_email=comp_email,company_contact=comp_contact,ctc=ctc,college_visited=clg_visited,type=selected_options,is_company=is_company,location=locations,college_branch=branch,user=users)
                    comp_db_obj.save()
                    return render(request,'dashboard/company_contact.html',{'msg':'Data Saved Successfully.'})
            else:    
                return render(request,'dashboard/company_contact.html')
        elif request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            res = Shared_Company.objects.all()
            return render(request,'dashboard/tnp_company_view.html',{'company_list':res})
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')    
        

# def hr_contact(request):
#     return render(request,'dashboard/hr_contact.html')

def handle_hr_contact(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==2 :     
            if request.method == 'POST':
                name = request.POST.get('name')
                company_name = request.POST.get('company-name')
                email = request.POST.get('company-email')
                contact_number = request.POST.get('number')
                linkedin = request.POST.get('linkedin')
                users = request.user
                print(users.userdetails.college_branch)
                hr_db_obj = Shared_HR_contact(name=name, company_name=company_name, email=email, contact_number=contact_number,linkedin_id=linkedin,college_branch=users.userdetails.college_branch,user=users)
                hr_db_obj.save()
                return redirect(request.path,{'msg':'Data Saved successfully!!!!'})
            else:
                return render(request , 'dashboard/hr_contact.html')
        elif request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            res = Shared_HR_contact.objects.all()
            return render(request,'dashboard/tnp_view.html',{'hr_list':res})
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')


# def print_list(request):
#     if request.user.is_authenticated:
#         if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
#             users = request.user
#             branch = users.userdetails.college_branch
#             res = HRContact.objects.filter(assigned=None,college_branch=branch)
#             return render(request,'dashboard/hr_list.html',{'hr_list':res})
#         else:
#             raise PermissionDenied
#     return render(request,'landing_page/home.html')

# def my_print_list(request):
#     if request.user.is_authenticated:
#         if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
#             users = request.user
#             branch = users.userdetails.college_branch
#             res = HRContact.objects.filter(assigned=request.user,college_branch=branch)
#             return render(request,'dashboard/my_hr_list.html',{'hr_list':res})
#         else:
#             raise PermissionDenied
    # return render(request,'landing_page/home.html')
    
def tnp_view(request):
    res = Shared_HR_contact.objects.all()
    return render(request,'dashboard/tnp_view.html',{'hr_list':res})

def delete_all_contact(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            users = request.user
            branch = users.userdetails.college_branch
            Shared_HR_contact.objects.all().delete(college_branch=branch)
            return render(request,'dashboard/tnp_view.html')
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')

def transfer_contact(request,hr_id):
    sh_hr_obj =  Shared_HR_contact.objects.get(id=hr_id)
    name = sh_hr_obj.name
    company = sh_hr_obj.company_name
    email = sh_hr_obj.email
    contact = sh_hr_obj.contact_number
    linkedin = sh_hr_obj.linkedin_id
    clg_branch = sh_hr_obj.college_branch
    # cmp_obj = Company.objects.get(name=company)
    hr_cont_obj = HRContact.objects.create(name=name,mail_id=email, mobile_numbers=[contact],linkedin=linkedin,college_branch=clg_branch)
    hr_cont_obj.save()
    return render(request,'dashboard/tnp_view.html') 
    
# TNP View of Company Details 

 
def tnp_company_view(request):
    users = request.user
    branch = users.userdetails.college_branch
    res = Shared_Company.objects.all(college_branch=branch)
    return render(request,'dashboard/tnp_company_view.html',{'company_list':res})

def delete_all_company_contact(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            users = request.user
            branch = users.userdetails.college_branch
            Shared_Company.objects.all(college_branch=branch).delete()
            return render(request,'dashboard/tnp_view.html')
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')

def assign_me(request,cnt):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            users = request.user
            branch = users.userdetails.college_branch
            res = HRContact.objects.get(name=cnt,college_branch=branch)
            res.assigned = request.user
            res.save()
            return redirect('hr_list')  
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')

def logout(request):
    auth.logout(request)
    return render(request,'landing_page/home.html')

def common_form(request):
    users = request.user
    branch = users.userdetails.college_branch
    print(branch)
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4:     
            if request.method == 'POST':
                name1 = request.POST.get('hr-name')
                email = request.POST.get('company-email')
                contact_number = request.POST.get('number')
                linkedin = request.POST.get('linkedin')
                gender = request.POST.get('hr-gender')
                users = request.user
                clg_branch = users.userdetails.college_branch
                hr_db_obj = HRContact(name=name1, gender=gender, mail_id=email, mobile_numbers=[contact_number],linkedin=linkedin,college_branch=clg_branch)
                hr_db_obj.save()
                return redirect(request.path,{'msg':'Data Saved successfully!!!!'})
            else:
                return render(request , 'dashboard/hr_common_form.html')
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')

def job_description(request,jd_id):
    if request.user.is_authenticated:
        if request.user.userprofile.role==1 or request.user.userprofile.role==2 or request.user.userprofile.role==3:
            if request.method == 'POST':
                print("hii")
            else :
                res =  Application.objects.filter(id=jd_id)
                return render(request,'dashboard/job_description.html',{'description':res})    
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')


def common_company_form(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            if request.method == 'POST':
                company_name = request.POST.get('company-name')
                comp_email = request.POST.get('company-email')
                comp_contact = request.POST.get('company-number')
                ctc = request.POST.get('ctc')
                clg_visited = request.POST.get('clg-vis')
                selected_options = request.POST.getlist('intern1')
                is_company = request.POST.get('is_company')
                locations = request.POST.get('location-id')
                users = request.user
                branch = users.userdetails.college_branch
                res = Shared_Company.objects.filter(company_name=company_name).exists()
                if res==True:
                    return render(request,'dashboard/common_comp_form.html',{'msg':'Company Already Exist !!!'})
                else:
                    comp_db_obj = Shared_Company(company_name=company_name,company_email=comp_email,company_contact=comp_contact,ctc=ctc,college_visited=clg_visited,type=selected_options,is_company=is_company,location=locations,college_branch=branch,user=users)
                    comp_db_obj.save()
                    res = Shared_Company.objects.all()
                    return render(request,'dashboard/tnp_company_view.html',{'company_list':res})
            else:  
                return render(request,'dashboard/common_comp_form.html')
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')  


def full_detail_visibility(request,cnt):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userdetails.role==4:
            users = request.user
            branch = users.userdetails.college_branch
            if request.method == 'POST':
                comment = request.POST.get('text-box')
                color = request.POST.get('is_color')
                his_obj = CallHistory.objects.filter(hr_id=cnt,college_branch=branch)
                hr_inst = HRContact.objects.get(id=cnt,college_branch=branch)
                std_inst = User.objects.get(id=request.user.id)
                if len(his_obj)>0:
                    ch=CallHistory(hr_id=hr_inst, colour=color,student_id=std_inst,college_branch=request.user.userdetails.college_branch,comment=comment)
                    ch.save()
                else:
                    call_his_obj1 = CallHistory.objects.create(hr_id=hr_inst ,colour=color,comment=comment,college_branch=request.user.userdetails.college_branch,student_id=std_inst)
                    call_his_obj1.save()
                return redirect(request.path)
            else:
                hr_obj = HRContact.objects.filter(id=cnt).values()
                comp_id = HRContact.objects.filter(id=cnt).values('company_id').first()
                val = comp_id['company_id']
                company_values = Company.objects.filter(id=val).values()
                call_his_obj = CallHistory.objects.filter(hr_id=cnt).values()
                return render(request,'dashboard/full_visibility.html',{'hr_list':hr_obj,'comp_values':company_values,'call_history':call_his_obj})
        else:
            PermissionDenied()
    return render(request,'landing_page/home.html')


def student_list(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userdetails.role==4:
            tnp_branch = request.user.userdetails.college_branch
            student = UserDetails.objects.filter(college_branch=tnp_branch)
            list_of_student = [i.user.first_name for i in student]
            return render(request, 'dashboard/student_list.html',{'res':list_of_student})
        else:
            PermissionDenied()
    else:
        return render(request,'landing_page/home.html')
    

def Announcement_form(request):
    if request.user.is_authenticated:
        role = request.user.userprofile.role
        if role==3 or role==4:
            if request.method=='POST':
                user = request.user
                annuncement = request.post.get('annuncement') 
                annuncement_obj = Announcement(user=user,annuncement=annuncement)
                annuncement_obj.save()
                return render(request,'')
            else:
                return render(request,'dashboard/annucement.html')
        else:
            PermissionDenied()
    else:
        return render(request,'landing_page/home.html')

#-------------------------------------------------------------------------------------------------------------------------

# APIs 


@api_view(['POST'])
class handle_comapany_contact_api(APIView):
    def post(self, request):
        user = request.user
        branch = user.userdetails.college_branch
        data = {
            'company' : request.data.get('company-name'),
            'comp_email' : request.data.get('company-email'),
            'comp_contact' : request.data.get('company-number'),
            'ctc' : request.data.get('ctc'),
            'clg_visited' : request.data.get('clg-vis'),
            'selected_options' : request.data.getlist('intern1'),
            'is_company' : request.data.get('is_company'),
            'locations' : request.data.get('location-id'),
            'users' : user,
            'branch': branch
        }
        company_serializer = Shared_CompanySerializer(data=data)
        if company_serializer.is_valid():
            company_serializer.save()
            return Response({'message':True},status=status.HTTP_200_ok)
        else:
            return Response({'message':False}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):  
        pass
    

@api_view(['POST'])
def handle_hr_contact_api(request):
    access = request.data.get('access')
    token = AccessToken(access)
    user_id = token.get('user_id')
    user = User.objects.get(id=user_id)
    branch = UserDetails.objects.get(user=user).college_branch
    print(branch)

    data = {
            'name': request.data.get('name'),
            'company_name': request.data.get('company-name'),
            'email': request.data.get('company-email'),
            'contact_number': request.data.get('number'),
            'linkedin_id': request.data.get('linkedin'),
            'college_branch': branch,
            'user': user
        }
    
    he_contact_serial = Shared_HR_contactSerializer(data=data)
    if he_contact_serial.is_valid(): 
        he_contact_serial.save()
        return Response({"message": True},status=status.HTTP_200_OK)
    else:
        return Response({'message': False}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def print_HRlist_api(request):
    user=request.user
    role = UserProfile.objects.get(user=user).role
    if role==3 or role==4:
        hrContact = HRContact.objects.filter(college_branch=user.userdetails.college_branch,assigned=None)
        hrcontactserializer = HRContactSerializer(hrContact,many=True)
        return Response(hrcontactserializer.data,status=status.HTTP_200_OK)
    else:
        return Response({'message': False},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def my_print_HRlist_api(request):
    user = request.user
    role = UserProfile.objects.get(user=user).role
    if role==3 or role==4:
        hrContact = HRContact.objects.filter(college_branch=user.userdetails.college_branch,assigned=user)
        hrcontactserializer = HRContactSerializer(hrContact,many=True)
        return Response(hrcontactserializer.data,status=status.HTTP_200_OK)
    else:
        return Response({'message': False},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def tnp_view_api(request):
    user = request.user
    role = UserProfile.objects.get(user=user).role
    if role==3 or role==4:
        sharedlist = Shared_HR_contact.objects.all(college_branch=user.user_profile.college_branch)
        sharedlistserializer = Shared_HR_contactSerializer(sharedlist,many=True)
        return Response(sharedlistserializer.data,status=status.HTTP_200_OK)
    else:
        return Response({'message':False},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def tnp_company_view_api(request):
    user = request.user
    role = UserProfile.objects.get(user=user).role
    if role==3 or role==4:
        sharedcompany = Shared_Company.objects.all(college_branch=user.user_profile.college_branch)
        sharedcompany_serializer = Shared_CompanySerializer(sharedcompany, many=True)
        return Response({"Shared_Company": sharedcompany_serializer.data},status=status.HTTP_200_OK)
    else:
        return Response({"message":False},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def appliedCompany_api(request):
    user=request.user
    application = Application.objects.get(user_id=user.id)
    appliedcompanyserializer = AppliedCompanySerializer(application,many=True)
    return Response({"AppliedCompanies": appliedcompanyserializer.data},status=status.HTTP_200_OK)


@api_view(['POST'])
def annuncement_form_api(request):
    user = request.user
    role = user.userprofile.role
    if role==3 or role==4:
        data ={
        'user': user,
        'announcement': request.data.get('announcement'),
        }
        announcement_serial = AnnouncementSerializer(data=data)
        announcement_serial.save()
        return Response({"message":True},status=status.HTTP_200_OK)
    else:
        return Response({"message":False},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def dummy(request):
    user = request.user
    role = UserProfile.objects.get(user=user).role
    if role==3 or role==4:
        dummy_hr_contact_data = [
            {
                "id": 1,
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "+123456789",
                "college_branch": "Computer Science",
                "assigned": user.id,
            },
            {
                "id": 2,
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "phone": "+987654321",
                "college_branch": "Mechanical Engineering",
                "assigned": user.id,
            }
        ]
        return Response({'HRList': dummy_hr_contact_data}, status=status.HTTP_200_OK)
    else:
        return Response({'message': False}, status=status.HTTP_400_BAD_REQUEST)
