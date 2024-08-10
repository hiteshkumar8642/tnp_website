from django.urls import path
from . import views
from dashboard import views
from django.urls import path, include
urlpatterns = [
    #-------------------------------------------------------------------------------------

    # College Lsit API
    path('api/collegelist/',views.CollegeListAPI,name='CollegeList'),
    # Course API
    path('api/course/',views.CoursesAPI,name='CourseList'),
    # Company contact data submission for TNPs/TPOs/Helpers   
    path('api/company_contacts/',views.handle_comapany_contact_api.as_view(),name='company_contacts'),
    # Printing list Shared Company List only for TNPs
    path('api/shared_Company_list/',views.SharedCompanyListAPI,name='shared_company_list'),
    # HR_Contact from submission 
    path('api/hr_contacts/',views.HandleHRContactAPI,name='hr_contacts'),
    # Printing list Shared HR List 
    path('api/shared_HR_list/',views.SharedHRListAPI,name='shared_hr_list'),
    # SharedHRContact to HRContact
    path('api/transfer/',views.TransferContactAPI,name='transfer_hr_contact'),
    # Delete All SharedHRs
    path('api/DltALL/',views.deleteALL_SharedHRContacts_API,name='delete_all_SharedHrList'),#///
    # Printing of HR List (ONLY FOR TNPs/TPOs)
    path('api/hr_list/',views.PrintHRListAPI,name="hr_list"),
    # Assign me api
    path('api/assign_me/',views.AssignMeAPI,name="assign_me"),
    # Company Data submission for the TNPs/TPOs and Helpers
    path('api/common_company_form/',views.common_company_form_api.as_view(),name="common_company_form"),#///
    # Printing My HR List for TNPs 
    path('api/my_hr_list/',views.MyHRListAPI,name="my_hr_list"),
    # Add announcement
    path('api/add_announcements/',views.AddAnnouncementAPI,name="add_announcement"),#///
    # Printing Announcement
    path('api/announcement/',views.get_announcements,name='announcement'),
    # Printing Application
    path('api/application/',views.application,name='application'),
    # Showing Applied Companies for the Students
    path('api/appliedCompany/',views.appliedCompany_api,name='applied_companies'),
    # All CallLogs of the branch for TNPs/TPOs
    path('api/callLogs/',views.CallHistoryAPI,name='callLogs'),

]
