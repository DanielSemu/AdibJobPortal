from django.urls import path
from .views import SendSMSView,UserApplicationAPIView

urlpatterns = [
    path("send-sms/", SendSMSView.as_view(), name='send_sms'),
    path("user_applications/", UserApplicationAPIView.as_view(), name='user_applications'),
    path("user_applications/<int:id>/", UserApplicationAPIView.as_view(), name='user_applications'),
]