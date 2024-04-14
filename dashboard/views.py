from django.shortcuts import render,redirect
from django.contrib.auth.models import User  

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College
from django.http import HttpResponse
from dashboard.models import Shared_Company,Shared_HR_contact,UserDetails

def dashboard(request):
    return render(request,'dashboard/companies.html')

def company_contact(request):
    return render(request,'company_contact.html')

# company_contact_handler
        
def handle_comapany_contact(request):
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
        user_id = users.id
        user_details = get_object_or_404(UserDetails, user=users)
        branch = user_details.college_branch

        res = Shared_Company.objects.filter(company_name=company_name).exists()
        if res==True:
            return render(request,'dashboard/company_contact.html',{'msg':'Company Already Exist !!!'})
        else:
            comp_db_obj = Shared_Company(company_name=company_name,company_email=comp_email,company_contact=comp_contact,ctc=ctc,college_visited=clg_visited,type=selected_options,is_company=is_company,location=locations,college_branch=branch,student_id=user_id)
            comp_db_obj.save()
            return render(request,'dashboard/company_contact.html',{'msg':'Data Saved Successfully.'})
    else:    
        return render(request,'dashboard/company_contact.html')
    

def hr_contact(request):
    return render(request,'dashboard/hr_contact.html')
     
# HR_contact_handler

def handle_hr_contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        company_name = request.POST.get('company-name')
        email = request.POST.get('company-email')
        contact_number = request.POST.get('number')
        linkedin = request.POST.get('linkedin')
        
        users = request.user
        print(users.userdetails.college_branch)
        # # user_id = users.id
        # # user_id = User.objects.get(id=request.user)
        # # print(user_id)
        # user_details = UserDetails.objects.get(user=users)
        # branch = user_details.college_branch


        # res = Shared_HR_contact.objects.filter(company_name=company_name,name=name).exists()
        # if res == True:
        #     return render(request,'dashboard/company_contact.html',{'msg':'Company Already Exist !!!'})
        # else:
        hr_db_obj = Shared_HR_contact(name=name, company_name=company_name, email=email, contact_number=contact_number,linkedin_id=linkedin,college_branch=users.userdetails.college_branch,user=users)
        hr_db_obj.save()
        return redirect(request.path,{'msg':'Data Saved successfully!!!!'})
    else:
        print("devvrat")
        return render(request , 'dashboard/hr_contact.html')
    
def print_list(request):
    res = Shared_HR_contact.objects.all()
    return render(request,'dashboard/hr_list.html',{'hr_list':res})
    
def tnp_view(request):
    res = Shared_HR_contact.objects.all()
    return render(request,'dashboard/tnp_view.html',{'hr_list':res})

def delete_all_contact(request):
    Shared_HR_contact.objects.all().delete()
    return render(request,'dashboard/tnp_view.html')

# def transfer_contact(request):
    

