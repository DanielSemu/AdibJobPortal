from django.urls import path
from .views import SendSMSView,UserApplicationAPIView,UserApplyForJobAPIView,AdminApplicationsAPIView,FilterApplicantsView,ConfirmFilteredApplicants,CriteriasAPIView,ApplicantReportAPIView,AdminFetchJobApplicants,generate_applicants_pdf,AdminRemoveApplicant

urlpatterns = [
    path("apply_job/", UserApplyForJobAPIView.as_view(), name='apply_job'),
    path("user_applications/", UserApplicationAPIView.as_view(), name='user_applications'),
    path("user_applications/<int:id>/", UserApplicationAPIView.as_view(), name='user_applications'),
    
    #
    path("admin_applicants/", AdminApplicationsAPIView.as_view(), name='admin_applications'),
    path("admin_applicants/<int:id>/", AdminApplicationsAPIView.as_view(), name='admin_applications'),
    path("admin_job_applicants/<int:id>/", AdminFetchJobApplicants.as_view(), name='job_applicants'),
    path('remove-applicant/<int:id>/', AdminRemoveApplicant.as_view(), name='remove_applicant'),
    
    path("review_filter_applicants/", FilterApplicantsView.as_view(), name='review_filter_applicants'),
    path("confirm_filter_applicants/", ConfirmFilteredApplicants.as_view(), name='confirm_filter_applicants'),
    path("revert_filter_applicants/<int:id>/", ConfirmFilteredApplicants.as_view(), name='revert_filter_applicants'),
    
    #
    path("criterias/",CriteriasAPIView.as_view(), name="criterias" ),
    #
    path("send-sms/", SendSMSView.as_view(), name='send_sms'),
    #
    path("generatePDF/", generate_applicants_pdf, name='generate_pdf'),
    path('report/', ApplicantReportAPIView.as_view(), name='applicant-report')

    #
    
]