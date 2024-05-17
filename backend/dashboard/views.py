from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College
from django.http import HttpResponse
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,Company,AppliedCompany,CallHistory

from rest_framework import viewsets
from .models import College
from .serializers import CollegeSerializer

class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer


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
        # elif request.user.userprofile.role==3 or request.user.userprofile.role==4 :
        #     res = Shared_HR_contact.objects.all()
        #     return render(request,'dashboard/tnp_view.html',{'hr_list':res})
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
                comment = request.POST.get('comment')
                color = request.POST.get('color')
                his_obj = CallHistory.objects.filter(hr_id=cnt)
                print(his_obj)
                if len(his_obj)>0:
                    print("his_obj")
                    ch=CallHistory(hr_id=cnt, color=color,student_id=request.user.id,college_branch=request.user.userdetails.college_branch,comment=comment)
                    ch.save()
                else:
                    print("new_obj")
                    call_his_obj1 = CallHistory.objects.create(hr_id=cnt ,color=color,comment=comment,college_branch=request.user.userdetails.college_branch,student_id=request.user.id)
                    call_his_obj1.save()
                return redirect('/')
            else:
                print(cnt)
                hr_obj = HRContact.objects.filter(id=cnt).values()
                comp_id = HRContact.objects.filter(id=cnt).values('company_id').first()
                val = comp_id['company_id']
                company_values = Company.objects.filter(id=val).values()
                print(company_values)
                clg_branch = request.user.userdetails.college_branch
                call_his_obj = CallHistory.objects.filter(hr_id=cnt).values()
                return render(request,'dashboard/full_visibility.html',{'hr_list':hr_obj,'comp_values':company_values,'call_history':call_his_obj})
        else:
            PermissionDenied()
    return render(request,'landing_page/home.html')


# def response_submisions(request,id):
#     if request.user.is_authenticated:
#         if request.user.userprofile.role==3 or request.user.userdetails.role==4:
#             if request.method == 'POST':
#                 comment = request.POST.get('comment')
#                 color = request.POST.get('color')
# {% url 'full_detail_visibility' cnt=hr_list.id %}
#                 his_obj = CallHistory.objects.filter(hr_id=id)
#                 if his_obj==True:
#                     his_obj.color = color
#                     his_obj.comment=comment
#                 else:
#                     CallHistory.objects.create(hr_id=id, color=color,comment=comment)
#                 return redirect('/')
#         else:
#             PermissionDenied()
#     return render(request,'landing_page/home.html')

