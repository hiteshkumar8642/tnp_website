from django.urls import path
from . import views
from dashboard import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CollegeViewSet,CourseViewSet,CollegeCourseViewSet,CompanyViewSet,Shared_CompanyViewSet,Shared_HRViewSet,HRContactViewSet,CallHistoryViewSet,UserDetailsViewSet,ApplicationViewSet,AppliedCompanyViewSet,UserProfileViewSet,AnnouncementViewSet

router = DefaultRouter()
router.register(r'College', CollegeViewSet)
router.register(r'Course', CourseViewSet)
router.register(r'CollegeCourse', CollegeCourseViewSet)
router.register(r'Company', CompanyViewSet)
router.register(r'Shared_Company', Shared_CompanyViewSet)
router.register(r'Shared_HR', Shared_HRViewSet)
router.register(r'HRContact', HRContactViewSet)
router.register(r'CallHistory', CallHistoryViewSet)
router.register(r'UserDetails', UserDetailsViewSet)
router.register(r'Application', ApplicationViewSet)
router.register(r'AppliedCompany', AppliedCompanyViewSet)
router.register(r'UserProfile', UserProfileViewSet)
router.register(r'Announcement', AnnouncementViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.dashboard, name='dashboard'),
    path('login', views.login, name='login'),
    path('applied_company/', views.appliedCompany, name='applied_company'),
    path('company_contacts/',views.handle_comapany_contact,name='company_contacts'),
    path('hr_contacts/',views.handle_hr_contact,name='hr_contacts'),
    path('job_description/<int:jd_id>',views.job_description,name='job_description'),
    path('hr_list/',views.print_list,name="hr_list"),
    path('my_hr_list/',views.my_print_list,name="my_hr_list"),
    path('tnp_view/',views.tnp_view,name="tnp_view"),
    path('dlt_all/',views.delete_all_contact,name="dlt_all"),
    path('transfer_contact/<int:hr_id>',views.transfer_contact,name="transfer_contact"),
    path('tnp_company_view/',views.tnp_company_view,name="tnp_company_view"),
    path('common_form/',views.common_form,name="common_form"),
    path('common_company_form/',views.common_company_form,name="common_company_form"),
    path('delete_all_company_contact/',views.delete_all_company_contact,name="delete_all_company_contact"),
    path('assign_me/<str:cnt>',views.assign_me,name="assign_me"),
    path('apply/<int:j_id>',views.apply,name="apply"),
    path('full_detail_visibility/<int:cnt>',views.full_detail_visibility,name="full_detail_visibility"),
    path('student_list/',views.student_list,name="student_list"),
    path('logout/',views.logout,name='logout')
]
