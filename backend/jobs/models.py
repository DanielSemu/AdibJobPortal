from django.db import models # type: ignore

class JobCategory(models.Model):
    name=models.CharField(max_length=255)
class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[("Full-time", "Full-time"), ("Part-time", "Part-time"), ("Contract", "Contract")])
    salary = models.CharField(max_length=255, default="As per Companies Salary Scale")
    description = models.TextField()
    application_deadline = models.DateField()

    def __str__(self):
        return self.title

class Responsibility(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="responsibilities")
    responsibility = models.TextField()

    def __str__(self):
        return f"{self.job.title} - {self.responsibility[:50]}"

class Qualification(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="qualifications")
    qualification = models.TextField()

    def __str__(self):
        return f"{self.job.title} - {self.qualification[:50]}"

class Skill(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="skills")
    skill = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.job.title} - {self.skill}"

class Benefit(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="benefits")
    benefit = models.TextField()

    def __str__(self):
        return f"{self.job.title} - {self.benefit}"
    
    
    
    
    # Job Application

class JobApplication(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    birth_date = models.DateField()

    def __str__(self):
        return f"Job Application - {self.full_name}"

class Education(models.Model):
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name="educations")
    education_level = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    graduation_year = models.IntegerField()
    education_organization = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.education_level} - {self.field_of_study} ({self.education_organization})"

class Experience(models.Model):
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name="experiences")
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    from_date = models.DateField()
    to_date = models.DateField(null=True, blank=True)  # Allows ongoing jobs

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class Certification(models.Model):
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name="certifications")
    certificate_title = models.CharField(max_length=255)
    awarding_company = models.CharField(max_length=255)
    awarded_date = models.DateField()
    certificate = models.FileField(upload_to='certifications/', null=True, blank=True)

    def __str__(self):
        return self.certificate_title

