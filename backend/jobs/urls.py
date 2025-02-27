from django.urls import path
from .views import ApplicantAPIView, JobView, ResponsibilityView, QualificationView, SkillView, BenefitView,getUserApplications

urlpatterns = [
    # Job CRUD operations
    path('jobs/', JobView.as_view(), name='job-list'),  # Get all jobs
    path('jobs/<int:id>/', JobView.as_view(), name='job-detail'),  # Get a single job
    
    # Responsibility CRUD operations (requires job_id)
    path('jobs/<int:job_id>/responsibilities/', ResponsibilityView.as_view(), name='responsibility-list-create'),
    
    # Qualification CRUD operations (requires job_id)
    path('jobs/<int:job_id>/qualifications/', QualificationView.as_view(), name='qualification-list-create'),
    
    # Skill CRUD operations (requires job_id)
    path('jobs/<int:job_id>/skills/', SkillView.as_view(), name='skill-list-create'),
    
    # Benefit CRUD operations (requires job_id)
    path('jobs/<int:job_id>/benefits/', BenefitView.as_view(), name='benefit-list-create'),
    path('applicants/', ApplicantAPIView.as_view(), name='applicants_api'),
    path('my_applications/', getUserApplications, name="my_applications"),
]
