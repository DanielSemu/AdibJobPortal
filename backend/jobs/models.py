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


JOB_STATUS_CHOICES = [
    ("Draft", "Draft"),
    ("Published", "Published"),
    ("Under Review", "Under Review"),
    ("Active", "Active"),
    ("Closed", "Closed"),
    ("Archived", "Archived"),
    ("Expired", "Expired"),
]
# Status	When to use
# Draft	Job is being created/edited but not published yet
# Published	Job is visible on the site, accepting applications (like your current "Active")
# Archived	Job is closed and hidden from public view, but still stored for admin access
# Under Review	Waiting for HR or admin approval before becoming Active
# Expired	Automatically marked when the application deadline passes

class Job(models.Model):
    vacancy_number = models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=255)
    job_grade = models.CharField(max_length=100, null=True, blank=True)
    company = models.CharField(max_length=255, default="Addis Bank S.C", blank=True)
    category = models.ForeignKey('JobCategory', on_delete=models.SET_NULL, null=True, related_name="jobs")
    
    # Changed to JSONField to support multiple locations
    location = models.TextField(blank=True)

    field_of_studies = models.JSONField(default=list, blank=True)

    job_type = models.CharField(max_length=50, choices=[
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Contract", "Contract")
    ])
    salary = models.CharField(max_length=255, default="As per Companies Salary Scale", blank=True)
    description = models.TextField()
    application_deadline = models.DateField()
    post_date = models.DateField(null=True, blank=True)
    show_experience = models.BooleanField()

    status = models.CharField(
    max_length=50,
    choices=JOB_STATUS_CHOICES,
    default="Draft")


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


    




class ContactUs(models.Model):
    full_name=models.CharField(max_length=150)
    email=models.EmailField(max_length=50)
    content=models.TextField()
    
    def __str__(self):
        return self.full_name
    