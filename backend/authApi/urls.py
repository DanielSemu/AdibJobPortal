from django.urls import path
from .views import UserProfileView,RegisterUserView,CustomTokenObtainPairView,CustomTokenRefreshView,LogoutView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('register/',RegisterUserView.as_view(), name='register_user'),
    path('logout/',LogoutView.as_view(), name='logout_user')
]
