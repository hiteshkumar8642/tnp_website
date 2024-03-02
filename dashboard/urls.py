from django.urls import path
from . import views
from dashboard import views
urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('company_contacts/',views.handle_comapany_contact,name='company_contacts'),
    path('in/',views.hr_contact,name='in_contact'),
    path('hr_contacts/',views.handle_hr_contact,name='hr_contacts'),
]
