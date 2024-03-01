from django.urls import path
from .views import CollegeLoginView
from dashboard import views
urlpatterns = [
    path('', CollegeLoginView.as_view(), name='college_login'),
    path('company_contacts/',views.handle_comapany_contact,name='company_contacts'),
    path('in/',views.hr_contact,name='in_contact'),
    path('hr_contacts/',views.handle_hr_contact,name='hr_contacts'),
]
