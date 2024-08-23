from django.urls import path
from .views import ApplicationView,CollegeListView,CompanyListView,TransferContactView,HRCallHistoryView,HRAssignMeView,DeleteAllSharedHRContactView,HRDataUpdateView,AddAnnouncementView,StudentListView,SharedHRListView,MyHRListView,HRListView,AnnouncementsListView,AppliedCompanysListView,CourseListView,HRContactModifyView,SharedCompanyModifyView,SharedCompanyListView
from .views import UserLoginView,LogoutView,RegisterView,CollegeRegisterView,ResetPasswordView,SaveDetailsView,UserDetailsModifyView,HRCallResponseView,DownloadAppliedStudentsListView,ReassignView , StudentsApplicationView
from .views import AddApplicationView
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    # Printing Application
    path('application/',ApplicationView.ApplicationView,name='application'),
    path('collegelist/',CollegeListView.CollegeListView,name='collegelist'),
    path('companylist/',CompanyListView.CompanyListView,name='companylist'),
    path('announcement/',AnnouncementsListView.AnnouncementsListView,name='announcement'),
    path('appliedcompany/',AppliedCompanysListView.AppliedCompanysListView,name='appliedcompanylist'),
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
    path('assignme/',HRAssignMeView.HRAssignMeView,name='assignme'),
    path('reassign/',ReassignView.ReassignView,name='reassign'),
    path('hrcalllogs/',HRCallHistoryView.HRCallHistoryView,name='hrcalllogs'),
    path('transfer-contact/',TransferContactView.TransferContactView,name='transfercontact'),
    path('login/',UserLoginView.MyTokenObtainPairView.as_view(),name='login'),
    path('logout/',LogoutView.LogoutView.as_view(),name='logout'),
    path('register/',RegisterView.RegisterView,name='register'),
    path('college-register/',CollegeRegisterView.CollegeRegisterView,name='collegeregister'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('savedetails/',SaveDetailsView.SaveDetailsView,name='savedetails'),
    path('update-user-details/',UserDetailsModifyView.UserDetailsModifyView,name='updateuserdetails'),
    path('hrcallresponse/',HRCallResponseView.HRCallResponseView,name='hrcallresponse'),
    path('download-applied-students/<int:company_id>/', DownloadAppliedStudentsListView.DownloadAppliedStudentsListView, name='download_applied_students'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('apply-to-company/<int:company_id>/', StudentsApplicationView.StudentsApplicationView.as_view(), name='apply-to-company'),
    path('addcompany/', AddApplicationView.AddApplicationView, name='addcompany'),


]