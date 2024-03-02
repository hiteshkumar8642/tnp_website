from django.urls import path
from userDetails.views import login
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('user/login',login,name='login'),
]