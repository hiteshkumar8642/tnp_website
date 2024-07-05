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

from rest_framework import viewsets
from .models import College
from .serializers import UserSerializer, CollegeSerializer,CourseSerializer,College_CourseSerializer,CompanySerializer,Shared_CompanySerializer,Shared_HR_contactSerializer,HRContactSerializer,CallHistorySerializer,UserDetailsSerializer,ApplicationSerializer,AppliedCompanySerializer,UserProfileSerializer,AnnouncementSerializer

class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CollegeCourseViewSet(viewsets.ModelViewSet):
    queryset = CollegeCourse.objects.all()
    serializer_class = College_CourseSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class Shared_CompanyViewSet(viewsets.ModelViewSet):
    queryset = Shared_Company.objects.all()
    serializer_class = Shared_CompanySerializer

class Shared_HRViewSet(viewsets.ModelViewSet):
    queryset = Shared_HR_contact.objects.all()
    serializer_class = Shared_HR_contactSerializer

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
    print(request)
    username = request.data.get('username')
    password = request.data.get('password')
    print(username)
    print(password)
    
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
        s1 = UserSerializer(users)
        s2 = UserDetailsSerializer(details,many=True)
        s3 = UserProfileSerializer(profile,many=True)
        s4 = CompanySerializer(company,many=True)
        s5 = HRContactSerializer(hr_cnt,many=True)
        if profile[0].role==3 or profile[0].role==4 :
            return Response({"message": "Login successful", "user": s1.data, "detail":s2.data ,"role":s3.data,"Company":s4.data,"HRContact":s5.data}, status=status.HTTP_200_OK)
        if profile[0].role==1:
            return Response({"message": "Login successful", "user": s1.data, "detail":s2.data ,"role":s3.data,"Company":s4.data}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

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
     
# HR_contact_handler

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

# TNP View of HR contact 
    
def print_list(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            res = HRContact.objects.filter(assigned=None)
            return render(request,'dashboard/hr_list.html',{'hr_list':res})
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')

def my_print_list(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            res = HRContact.objects.filter(assigned=request.user)
            return render(request,'dashboard/my_hr_list.html',{'hr_list':res})
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')
    
def tnp_view(request):
    res = Shared_HR_contact.objects.all()
    return render(request,'dashboard/tnp_view.html',{'hr_list':res})

def delete_all_contact(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            Shared_HR_contact.objects.all().delete()
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
    res = Shared_Company.objects.all()
    return render(request,'dashboard/tnp_company_view.html',{'company_list':res})

def delete_all_company_contact(request):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            Shared_Company.objects.all().delete()
            return render(request,'dashboard/tnp_view.html')
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')

def assign_me(request,cnt):
    if request.user.is_authenticated:
        if request.user.userprofile.role==3 or request.user.userprofile.role==4 :
            res = HRContact.objects.get(name=cnt)
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
            if request.method == 'POST':
                comment = request.POST.get('text-box')
                color = request.POST.get('is_color')
                his_obj = CallHistory.objects.filter(hr_id=cnt)
                hr_inst = HRContact.objects.get(id=cnt)
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



