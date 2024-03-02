from django.contrib import admin
from .models import College, Application, AppliedCompany, CallHistory, CollegeCourse, Company, Course, UserDetails, HRContact,Shared_Company,Shared_HR_contact

admin.site.register(College)
admin.site.register(AppliedCompany)
admin.site.register(Application)
admin.site.register(CollegeCourse)
admin.site.register(CallHistory)
admin.site.register(Company)
admin.site.register(Course)
admin.site.register(UserDetails)
admin.site.register(HRContact)
admin.site.register(Shared_Company)
admin.site.register(Shared_HR_contact)