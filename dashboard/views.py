from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth  
from django.core.exceptions import PermissionDenied
# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College
from django.http import HttpResponse
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails,HRContact,Announcement,Application,Company

def dashboard(request):
    if request.user.is_authenticated:
        announcement=Announcement.objects.all().order_by('created')[:10]
        application=Application.objects.all().order_by('last_date')
        return render(request,'dashboard/companies.html',{'announcement':announcement , 'application':application})
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
            return render(request,'dashboard/hr_list.html',{'hr_list':res})
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
    cmp_obj = Company.objects.get(name=company)
    print(cmp_obj)
    hr_cont_obj = HRContact.objects.create(name=name.upper(),mail_id=email, mobile=contact,linkedin=linkedin,college_branch=clg_branch,company_id=cmp_obj.pk)
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
            print(res.assigned)
            res.assigned = request.user
            print(res.assigned)
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
                gender = request.POST.get('gender')
                users = request.user
                clg_branch = users.userdetails.college_branch
                # comp_obj = Company.objects.filter(name=company_name)
                print(name1)
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
                    return render(request,'dashboard/company_contact.html',{'msg':'Company Already Exist !!!'})
                else:
                    comp_db_obj = Shared_Company(company_name=company_name,company_email=comp_email,company_contact=comp_contact,ctc=ctc,college_visited=clg_visited,type=selected_options,is_company=is_company,location=locations,college_branch=branch,user=users)
                    comp_db_obj.save()
                    print("devvrat")
                    res = Shared_Company.objects.all()
                    return render(request,'dashboard/tnp_company_view.html',{'company_list':res})
            else:    
                return render(request,'dashboard/company_contact.html')
        else:
            raise PermissionDenied
    return render(request,'landing_page/home.html')   

