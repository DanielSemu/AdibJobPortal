from django.db import models

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
