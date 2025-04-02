from django.urls import path
from .views import ApplicantAPIView, JobView,getUserApplications,ContactUsAPIView,JobCategoryView

urlpatterns = [
    # Job CRUD operations
    path('jobs/', JobView.as_view(), name='job-list'),  # Get all jobs
    path('jobs/<int:id>/', JobView.as_view(), name='job-detail'),  # Get a single job
    
    path('categories/', JobCategoryView.as_view(), name='categories-list'),  # Get all jobs
    path('categories/<int:id>/', JobCategoryView.as_view(), name='category-detail'),  # Get a single job
   
    path('applicants/', ApplicantAPIView.as_view(), name='applicants_api'),
    path('my_applications/', getUserApplications, name="my_applications"),
    
    path('contacts/', ContactUsAPIView.as_view(), name='contact-list-create'),  
    path('contacts/<int:pk>/', ContactUsAPIView.as_view(), name='contact-detail'), 
]
