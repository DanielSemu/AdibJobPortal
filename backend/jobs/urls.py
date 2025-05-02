from django.urls import path
from .views import ApplicantAPIView,ExpiredJobView, JobView,getUserApplications,ContactUsAPIView,JobCategoryView,AdminJobView,JobBulkUploadView,JobDetailBulkUploadView,FilterApplicantsView,getUnderReviewApplicants,ConfirmFilteredApplicants,ExportEmployeeDataView,ActiveJobApplicants

urlpatterns = [
    path('export_applicant/',ExportEmployeeDataView.as_view(),name='export_applicant'),
    # Job CRUD operations
    path('jobs/', JobView.as_view(), name='job-list'),  # Get all jobs
    path('jobs/<int:id>/', JobView.as_view(), name='job-detail'),  # Get a single job
    path('expired_jobs/', ExpiredJobView.as_view(), name='expired_jobs'),  # Get a single job
    
    path('admin_jobs/', AdminJobView.as_view(), name='admin_job-list'),  # Get all jobs
    path('admin_jobs/<int:id>/', AdminJobView.as_view(), name='admin_job-detail'),  # Get a single job
    path('jobs/bulk-upload/', JobBulkUploadView.as_view(), name='job-bulk-upload'),
    path('jobs/job-detail-upload/<int:job_id>/', JobDetailBulkUploadView.as_view(), name='job-detail-bulk-upload'),

    
    path('categories/', JobCategoryView.as_view(), name='categories-list'),  # Get all jobs
    path('categories/<int:id>/', JobCategoryView.as_view(), name='category-detail'),  # Get a single job
   
    path('applicants/', ApplicantAPIView.as_view(), name='applicants_api'),
    path('applicants/<int:id>/', ApplicantAPIView.as_view(), name='applicants_detail'),
    path('job/applicants/<int:id>/', ActiveJobApplicants.as_view(), name='active_job_applicant'),
    path('my_applications/', getUserApplications, name="my_applications"),
    path('filter_applicants/', FilterApplicantsView.as_view(), name="filter_applicants"),
    path('confirm_filter/', ConfirmFilteredApplicants.as_view(), name="confirm_filter"),
    path('get_under_review_applicants/', getUnderReviewApplicants, name="get_under_review_applicants"),
    
    
    path('contacts/', ContactUsAPIView.as_view(), name='contact-list-create'),  
    path('contacts/<int:pk>/', ContactUsAPIView.as_view(), name='contact-detail'), 
]
