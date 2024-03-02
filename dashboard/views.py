from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College
from django.http import HttpResponse
from dashboard.models import Shared_Company,Shared_HR_contact

def dashboard(request):
    return render(request,'dashboard/companies.html')




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

        res = Shared_Company.objects.filter(company_name=company_name)
        comp_db_obj = Shared_Company(company_name=company_name,company_email=comp_email,company_contact=comp_contact,ctc=ctc,college_visited=clg_visited,type=selected_options,is_company=is_company,location=locations)
        comp_db_obj.save()
        return render(request,'company_contact.html')
    else:    
        return render(request,'company_contact.html')



def hr_contact(request):
    return render(request,'hr_contact.html')

     
# HR_contact_handler

def handle_hr_contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        company_name = request.POST.get('company-name')
        email = request.POST.get('company-email')
        contact_number = request.POST.get('number')
        linkedin = request.POST.get('linkedin')

        hr_db_obj = Shared_HR_contact(name=name, company_name=company_name, email=email, contact_number=contact_number,linkedin_id=linkedin)
        hr_db_obj.save()
        return render(request,'hr_contact.html',{'msg':'Data Saved successfully!!!!'})
    else:    
        return render(request,'hr_contact.html')