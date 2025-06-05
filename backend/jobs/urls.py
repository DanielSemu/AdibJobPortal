from django.urls import path
from .views import ExpiredJobView, JobView,ContactUsAPIView,JobCategoryView,AdminJobView,JobBulkUploadView,JobDetailBulkUploadView


urlpatterns = [
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
   
    
    path('contacts/', ContactUsAPIView.as_view(), name='contact-list-create'),  
    path('contacts/<int:pk>/', ContactUsAPIView.as_view(), name='contact-detail'), 
]
