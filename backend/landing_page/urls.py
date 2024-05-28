from django.urls import path
from userDetails.views import login
from userDetails.views import CollegeRegister
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('user/login',login,name='login'),
    path('CollegeRegister',CollegeRegister,name='CollegeRegister'),
]