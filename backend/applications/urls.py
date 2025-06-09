from django.urls import path
from .views import SendSMSView,UserApplicationAPIView,UserApplyForJobAPIView,AdminApplicationsAPIView,FilterApplicantsView

urlpatterns = [
    path("apply_job/", UserApplyForJobAPIView.as_view(), name='apply_job'),
    path("user_applications/", UserApplicationAPIView.as_view(), name='user_applications'),
    path("user_applications/<int:id>/", UserApplicationAPIView.as_view(), name='user_applications'),
    
    #
    path("admin_applicants/", AdminApplicationsAPIView.as_view(), name='applications'),
    path("admin_applicants/<int:id>/", AdminApplicationsAPIView.as_view(), name='applications'),
    
    path("review_filter_applicants/", FilterApplicantsView.as_view(), name='applications'),
    path("send-sms/", SendSMSView.as_view(), name='send_sms'),
]