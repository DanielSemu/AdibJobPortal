from django.db import models
from jobs.models import Job
# Create your models here.
class Applicant(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Under Review', 'Under Review'),
        ('Shortlisted', 'Shortlisted'),
        ('Interview Scheduled', 'Interview Scheduled'),
        ('Interviewed', 'Interviewed'),
        ('Assessment Pending', 'Assessment Pending'),
        ('Offered', 'Offered'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
        ('Withdrawn', 'Withdrawn'),
        ('Hired', 'Hired'),
        ('On Hold', 'On Hold'),
        ('Waitlisted', 'Waitlisted'),
        ('Background Check', 'Background Check'),
    ]
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applicants')
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    birth_date = models.DateField()
    # Educational Background
    education_level = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    education_organization = models.CharField(max_length=255)
    graduation_year = models.DateField()
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)  # Up to 99.99
    exit_exam = models.DecimalField(max_digits=4, decimal_places=2)

    # Other Fields
    contact_consent = models.BooleanField(default=False)
    cover_letter = models.TextField(blank=True)
    resume = models.FileField(upload_to='resumes/',blank=True ,null=True  )
    terms_accepted = models.BooleanField(default=False)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    selected_work_place=models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.full_name

# class Education(models.Model):
#     applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name='educations')
#     education_level = models.CharField(max_length=100)
#     field_of_study = models.CharField(max_length=100)
#     education_organization = models.CharField(max_length=255)
#     graduation_year = models.DateField()
#     cgpa = models.DecimalField(max_digits=10, decimal_places=2)
#     exit_exam = models.DecimalField(max_digits=10, decimal_places=2, null=True , blank=True)

#     def __str__(self):
#         return f"{self.education_level} - {self.education_organization}"

class Experience(models.Model):
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name='experiences')
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=255)
    from_date = models.DateField()
    to_date = models.DateField()
    banking_experience=models.BooleanField(default=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class Certification(models.Model):
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name='certifications')
    certificate_title = models.CharField(max_length=100)
    awarding_company = models.CharField(max_length=255)
    awarded_date = models.DateField()
    # certificate_file = models.FileField(upload_to='certificates/',blank=True ,null=True  )

    def __str__(self):
        return self.certificate_title
    

class Criteria(models.Model):
    job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    min_experience_years = models.FloatField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    min_cgpa = models.FloatField(blank=True, null=True)
    min_exit_score = models.FloatField(blank=True, null=True)
    matched_applicants = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Criterias for Job: {self.job}"


# models.py
class TempApplicant(models.Model):
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    # session_id = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.applicant.full_name
