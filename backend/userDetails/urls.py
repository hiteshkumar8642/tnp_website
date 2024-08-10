from django.urls import path
from . import views
from django.urls import path,include
from django.contrib.auth import views as auth_views
from .views import MyTokenObtainPairView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register" , views.register , name = "register"),
    path("login" , views.login , name = "login"),
    path("SaveDetails",views.SaveDetails,name = "SaveDetails"),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path("userProfile" , views.userProfile , name="userProfile"),
    path("UpdateDetails" , views.UpdateDetails , name = "UpdateDetails"),
    path('CollegeRegister',views.CollegeRegister,name='CollegeRegister'),
    # # JWT Authentication paths
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh1/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/login/', views.jwt_login, name='jwt_login'),

    path("api/register/" , views.register , name = "register"),
    path('api/CollegeRegister/',views.CollegeRegister,name='CollegeRegister'),
    path('api/savedetails/',views.SaveDetailsAPI,name='SaveDetails'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='auth_logout'),
    #path('api/password_reset/', ResetPasswordAPIView.as_view(), name='api_password_reset'),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

]