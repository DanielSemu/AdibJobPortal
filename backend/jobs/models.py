from django.db import models # type: ignore

class JobCategory(models.Model):
    name=models.CharField(max_length=255)
    def __str__(self):
        return self.name
class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, default="Addis Bank S.C")
    category=models.ForeignKey(JobCategory, on_delete=models.CASCADE, related_name="category")
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[("Full-time", "Full-time"), ("Part-time", "Part-time"), ("Contract", "Contract")])
    salary = models.CharField(max_length=255, default="As per Companies Salary Scale")
    description = models.TextField()
    application_deadline = models.DateField()
    status=models.CharField(max_length=50, choices=[("Active","Active"),("InActive","InActive"),("Closed","Closed")], default="InActive")
    how_to_apply=models.TextField(default="To apply, please fill out the application form below and upload your CV. Ensure all fields are completed before submitting your application. Application deadline:")

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
    
    
    

class Applicant(models.Model):
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

    def __str__(self):
        return self.full_name

class Education(models.Model):
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name='educations')
    education_level = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    education_organization = models.CharField(max_length=255)
    graduation_year = models.DateField()

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
    certificate_file = models.FileField(upload_to='certificates/',blank=True ,null=True  )

    def __str__(self):
        return self.certificate_title
