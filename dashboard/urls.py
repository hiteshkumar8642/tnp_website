from django.urls import path
from .views import CollegeLoginView
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('', CollegeLoginView.as_view(), name='college_login'),
]
