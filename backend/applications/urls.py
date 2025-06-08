from django.urls import path
from .views import SendSMSView,UserApplicationAPIView,UserApplyForJobAPIView

urlpatterns = [
    path("apply_job/", UserApplyForJobAPIView.as_view(), name='apply_job'),
    path("user_applications/", UserApplicationAPIView.as_view(), name='user_applications'),
    path("user_applications/<int:id>/", UserApplicationAPIView.as_view(), name='user_applications'),
    path("send-sms/", SendSMSView.as_view(), name='send_sms'),
]