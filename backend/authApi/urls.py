from django.urls import path
from .views import UserProfileView,RegisterUserView,CustomTokenObtainPairView,CustomTokenRefreshView,LogoutView,ApplicantTokenObtainPairView,ApplicantRegisterView,ApplicantProfileView,ApplicantTokenRefreshView,ApplicantLogoutView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('register/',RegisterUserView.as_view(), name='register_user'),
    path('logout/',LogoutView.as_view(), name='logout_user'),
    #
    path('applicant/login/', ApplicantTokenObtainPairView.as_view(), name='applicant_Login'),
    path('applicant/token/refresh/', ApplicantTokenRefreshView.as_view(), name='applicant_Login'),
    path('applicant/register/', ApplicantRegisterView.as_view(), name='applicant_register'),
    path('applicant/profile/', ApplicantProfileView.as_view(), name='applicant_profile'),
    path('applicant/logout/', ApplicantLogoutView.as_view(), name='applicant_profile')
]
