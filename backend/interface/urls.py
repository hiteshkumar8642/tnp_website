from django.urls import path
from .views import ApplicationView,CollegeListView,TransferContactView,HRCallHistoryView,HRAssignMeView,DeleteAllSharedHRContactView,HRDataUpdateView,AddAnnouncementView,StudentListView,SharedHRListView,MyHRListView,HRListView,AnnouncementsListView,AppliedCompanysListView,CourseListView,HRContactModifyView,SharedCompanyModifyView,SharedCompanyListView
from .views import UserLoginView,LogoutView,RegisterView,CollegeRegisterView,ResetPasswordView,SaveDetailsView,UserDetailsModifyView,HRCallResponseView,DownloadAppliedStudentsListView
from django.urls import path, include


urlpatterns = [
    # Printing Application
    path('application/',ApplicationView.ApplicationView,name='application'),
    path('collegelist/',CollegeListView.CollegeListView,name='collegelist'),
    path('announcement/',AnnouncementsListView.AnnouncementsListView,name='announcement'),
    path('applied-company-list/',AppliedCompanysListView.AppliedCompanysListView,name='appliedcompanylist'),
    path('courselist/',CourseListView.CourseListView,name='courselist'),
    path('hrcontactmodify/',HRContactModifyView.HRContactModifyView,name='hrcontactmodify'),
    path('shared-companymodify/',SharedCompanyModifyView.SharedCompanyModifyView.as_view(),name='sharedcompanymodify'),
    path('sharedcompanylist/',SharedCompanyListView.SharedCompanyListView.as_view(),name='sharedcompanymodify'),
    path('hrlist/',HRListView.HRListView,name='hrlist'),
    path('myhrlist/',MyHRListView.MyHRListView,name='myhrlist'),
    path('sharedhrlist/',SharedHRListView.SharedHRListView,name='sharedhrlist'),
    path('studentlist/',StudentListView.StudentListView,name='studentlist'),
    path('addannouncement/',AddAnnouncementView.AddAnnouncementView,name='studentlist'),
    path('hrdata-modified/',HRDataUpdateView.HRDataUpdateView,name='hrdatamodified'),
    path('delete-sharedhr-contact/',DeleteAllSharedHRContactView.DeleteAllSharedHRContactView,name='deletesharedhrcontact'),
    path('assignme/',HRAssignMeView.HRAssignMeView,name='deletesharedhrcontact'),
    path('hrcalllogs/',HRCallHistoryView.HRCallHistoryView,name='hrcalllogs'),
    path('transfer-contact/',TransferContactView.TransferContactView,name='transfercontact'),
    path('login/',UserLoginView.MyTokenObtainPairView.as_view(),name='login'),
    path('logout/',LogoutView.LogoutView.as_view(),name='logout'),
    path('register/',RegisterView.RegisterView,name='register'),
    path('college-register/',CollegeRegisterView.CollegeRegisterView,name='collegeregister'),
    path('reset-password/',ResetPasswordView.ResetPasswordView.as_view(),name='resetpassword'),
    path('savedetails/',SaveDetailsView.SaveDetailsView,name='savedetails'),
    path('update-user-details/',UserDetailsModifyView.UserDetailsModifyView,name='updateuserdetails'),
    path('hrcallresponse/',HRCallResponseView.HRCallResponseView,name='hrcallresponse'),
    path('download-applied-students/<int:company_id>/', DownloadAppliedStudentsListView.DownloadAppliedStudentsListView, name='download_applied_students'),
]