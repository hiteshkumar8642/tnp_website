from django.urls import path
from . import views
from dashboard import views
from django.urls import path, include
urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    # path('login', views.login, name='login'),
    path('applied_company/', views.appliedCompany, name='applied_company'),
    # path('company_contacts/',views.handle_comapany_contact,name='company_contacts'),
    path('hr_contacts/',views.handle_hr_contact,name='hr_contacts'),
    path('job_description/<int:jd_id>',views.job_description,name='job_description'),
    # path('hr_list/',views.print_list,name="hr_list"),
    # path('my_hr_list/',views.my_print_list,name="my_hr_list"),
    path('tnp_view/',views.tnp_view,name="tnp_view"),
    path('dlt_all/',views.delete_all_contact,name="dlt_all"),
    path('transfer_contact/<int:hr_id>',views.transfer_contact,name="transfer_contact"),
    path('tnp_company_view/',views.tnp_company_view,name="tnp_company_view"),
    path('common_form/',views.common_form,name="common_form"),
    path('common_company_form/',views.common_company_form,name="common_company_form"),
    path('delete_all_company_contact/',views.delete_all_company_contact,name="delete_all_company_contact"),
    path('assign_me/<int:cnt>',views.assign_me,name="assign_me"),
    path('apply/<int:j_id>',views.apply,name="apply"),
    path('full_detail_visibility/<int:cnt>',views.full_detail_visibility,name="full_detail_visibility"),
    path('student_list/',views.student_list,name="student_list"),
    path('logout/',views.logout,name='logout'),
    # path('announcement/',views.announcement,name='announcement'),
    # path('application/',views.application,name='application'),
    # path('assign_me/<int:cnt>',views.assign_me,name="assign_me"),
    
    #----------------------------------------------------------

 
 
    # Company contact data submission for TNPs/TPOs/Helpers   
    path('api/company_contacts/',views.handle_comapany_contact_api.as_view(),name='company_contacts'),
    # Printing list Shared Company List only for TNPs
    path('api/shared_Company_list/',views.SharedCompanyListAPI,name='shared_company_list'),
    # HR_Contact from submission 
    path('api/hr_contacts/',views.HandleHRContactAPI,name='hr_contacts'),
    # Printing list Shared HR List 
    path('api/shared_HR_list/',views.SharedHRListAPI,name='shared_hr_list'),
    # Delete All SharedHRs 
    path('api/DltALL/',views.deleteALL_SharedHRContacts_API,name='delete_all_SharedHrList'),
    # Printing of HR List (ONLY FOR TNPs/TPOs)
    path('api/hr_list/',views.PrintHRListAPI,name="hr_list"),
    # Assign me api
    path('api/assign_me/',views.AssignMeAPI,name="assign_me"),
    # Company Data submission for the TNPs/TPOs and Helpers
    path('api/common_company_form/',views.common_company_form_api.as_view(),name="common_company_form"),
    # Printing My HR List for TNPs 
    path('api/my_hr_list/',views.MyHRListAPI,name="my_hr_list"),
    # Printing Announcement
    path('api/announcement/',views.get_announcements,name='announcement'),
    # Printing Application
    path('api/application/',views.application,name='application'),
    # Showing Applied Companies for the Students
    path('api/appliedCompany/',views.appliedCompany_api,name='applied_companies'),

]
