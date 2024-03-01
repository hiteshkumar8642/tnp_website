# dashboard/views.py

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College
from django.http import HttpResponse
from dashboard.models import Company_contacts,HR_contact


class CollegeLoginView(LoginView):
    template_name = 'login.html'
    def get(self, request, *args, **kwargs):
        subdomain = request.get_host().split('.')[0]
        college = get_object_or_404(College, subdomain=subdomain)
        return render(request, self.template_name, {'college': college})


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

        res = Company_contacts.objects.filter(company_name=company_name)
        comp_db_obj = Company_contacts(company_name=company_name,company_email=comp_email,company_contact=comp_contact,ctc=ctc,college_visited=clg_visited,type=selected_options,is_company=is_company,location=locations)
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

        hr_db_obj = HR_contact(name=name, company_name=company_name, email=email, contact_number=contact_number,linkedin_id=linkedin)
        hr_db_obj.save()
        return render(request,'hr_contact.html',{'msg':'Data Saved successfully!!!!'})
    else:    
        return render(request,'hr_contact.html')