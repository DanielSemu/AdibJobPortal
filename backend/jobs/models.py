from django.db import models
from django.db.models import Case, When, Value, IntegerField
from django.utils.timezone import now
from django.utils import timezone


class JobCategory(models.Model):
    IconName = [
        ("AiFillSketchSquare", "AiFillSketchSquare"),
        ("MdOutlineMenuBook", "MdOutlineMenuBook"),
        ("AiOutlinePieChart", "AiOutlinePieChart"),
        ("FaChalkboardUser", "FaChalkboardUser"),
        ("FaLaptopCode", "FaLaptopCode"),
    ]
    name = models.CharField(max_length=255)
    iconName=models.CharField(max_length=200, choices=IconName, null=True, blank=True)

    def __str__(self):
        return self.name

class Job(models.Model):
    vacancy_number=models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=255)
    job_grade=models.CharField(max_length=100 , null=True, blank=True)
    company = models.CharField(max_length=255, default="Addis Bank S.C")
    category = models.ForeignKey(JobCategory, on_delete=models.CASCADE, related_name="jobs")
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=50, choices=[("Full-time", "Full-time"), ("Part-time", "Part-time"), ("Contract", "Contract")])
    salary = models.CharField(max_length=255, default="As per Companies Salary Scale")
    description = models.TextField()
    application_deadline = models.DateField()
    post_date = models.DateField(null=True, blank=True) 
    show_experience=models.BooleanField()
    status = models.CharField(
        max_length=50,
        choices=[("Active", "Active"), ("InActive", "InActive"), ("Closed", "Closed")],
        default="InActive",
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    

    


    def __str__(self):
        return self.title

class JobDetail(models.Model):
    DETAIL_TYPES = [
        ("Responsibility", "Responsibility"),
        ("Qualification", "Qualification"),
        ("Skill", "Skill"),
        ("Benefit", "Benefit"),
    ]
    
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="details")
    detail_type = models.CharField(max_length=20, choices=DETAIL_TYPES)
    description = models.TextField()

    class Meta:
        ordering = [
            Case(
                When(detail_type="Responsibility", then=Value(1)),
                When(detail_type="Qualification", then=Value(2)),
                When(detail_type="Skill", then=Value(3)),
                When(detail_type="Benefit", then=Value(4)),
                default=Value(5),
                output_field=IntegerField(),
            )
        ]

    def __str__(self):
        return f"{self.job.title} - {self.detail_type}: {self.description[:50]}"


    

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
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='job')
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    birth_date = models.DateField()
    contact_consent = models.BooleanField(default=False)
    cover_letter = models.TextField(blank=True)
    resume = models.FileField(upload_to='resumes/',blank=True ,null=True  )
    terms_accepted = models.BooleanField(default=False)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    def __str__(self):
        return self.full_name

class Education(models.Model):
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name='educations')
    education_level = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    education_organization = models.CharField(max_length=255)
    graduation_year = models.DateField()
    cgpa = models.DecimalField(max_digits=10, decimal_places=2)
    exit_exam = models.DecimalField(max_digits=10, decimal_places=2, null=True , blank=True)

    def __str__(self):
        return f"{self.education_level} - {self.education_organization}"

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



class ContactUs(models.Model):
    full_name=models.CharField(max_length=150)
    email=models.EmailField(max_length=50)
    content=models.TextField()
    
    def __str__(self):
        return self.full_name
    