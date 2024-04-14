from django.urls import path
from . import views
from dashboard import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('company_contacts/',views.handle_comapany_contact,name='company_contacts'),
    path('hr_contacts/',views.handle_hr_contact,name='hr_contacts'),
    path(',/',views.print_list,name="hr_list"),
    path('tnp_view/',views.tnp_view,name="tnp_view"),
    path('dlt_all/',views.delete_all_contact,name="dlt_all"),
    path('transfer_contact/<int:hr_id>',views.transfer_contact,name="transfer_contact"),
    path('tnp_company_view/',views.tnp_company_view,name="tnp_company_view"),
    path('delete_all_company_contact/',views.delete_all_company_contact,name="delete_all_company_contact")
]
