from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.views import LoginView
from .models import College


def home(request):
    return render(request,'dashboard/companies.html')



