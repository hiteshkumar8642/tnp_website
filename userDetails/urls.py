from django.urls import path
from . import views
urlpatterns = [
    path("register" , views.register , name = "register"),
    path("login" , views.login , name = "login"),
    path("SaveDetails",views.SaveDetails,name = "SaveDetails"),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path("userProfile" , views.userProfile , name="userProfile"),
]