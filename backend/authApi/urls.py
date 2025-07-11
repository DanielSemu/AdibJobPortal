from django.urls import path
from .views import InternalUserProfileView,InternalUserView,InternalTokenObtainPairView,InternalTokenRefreshView,LogoutView,ApplicantTokenObtainPairView,ApplicantRegisterView,ApplicantProfileView,ApplicantTokenRefreshView,ApplicantLogoutView,CheckUserExistsView,ResetPasswordView

urlpatterns = [
    path('token/', InternalTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', InternalTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', InternalUserProfileView.as_view(), name='user_profile'),
    path('user/',InternalUserView.as_view(), name='register_user'),
    path('user/<str>:id/',InternalUserView.as_view(), name='register_user'),
    path('logout/',LogoutView.as_view(), name='logout_user'),
    #
    path('applicant/login/', ApplicantTokenObtainPairView.as_view(), name='applicant_Login'),
    path('applicant/token/refresh/', ApplicantTokenRefreshView.as_view(), name='applicant_Login'),
    path('applicant/profile/', ApplicantProfileView.as_view(), name='applicant_profile'),
    path('applicant/register/', ApplicantRegisterView.as_view(), name='applicant_register'),
    path('applicant/check_user/', CheckUserExistsView.as_view(), name='check-user'),
    path('applicant/reset_password/', ResetPasswordView.as_view(), name='reset_password'),
    path('applicant/logout/', ApplicantLogoutView.as_view(), name='applicant_logout')
]
