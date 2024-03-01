from django.shortcuts import render, get_object_or_404

# Create your views here.
def home(request):
    subdomain = request.get_host().split('.')[0]
    print(subdomain)
    return render(request,'landing_page/home.html')