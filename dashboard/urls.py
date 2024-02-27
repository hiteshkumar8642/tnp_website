from django.urls import path
from .views import CollegeLoginView
urlpatterns = [
    path('', CollegeLoginView.as_view(), name='college_login'),
]
