from django.contrib import admin
from .models import Job,Benefit,JobCategory,Qualification,Responsibility,Skill,Applicant,Certification,Education,Experience,ContactUs
# Register your models here.

admin.site.register(Job)
admin.site.register(Benefit)
admin.site.register(JobCategory)
admin.site.register(Qualification)
admin.site.register(Responsibility)
admin.site.register(Skill)

admin.site.register(Applicant)
admin.site.register(Experience)
admin.site.register(Certification)
admin.site.register(Education)
admin.site.register(ContactUs)
