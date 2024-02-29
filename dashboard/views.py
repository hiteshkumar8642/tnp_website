# dashboard/views.py
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College

def home(request):
    return render(request,'dashboard/companies.html')

class CollegeLoginView(LoginView):
    template_name = 'login.html'

    def get(self, request, *args, **kwargs):
        subdomain = request.get_host().split('.')[0]
        college = get_object_or_404(College, subdomain=subdomain)
        return render(request, self.template_name, {'college': college})

