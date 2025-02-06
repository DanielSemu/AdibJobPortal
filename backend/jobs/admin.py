from django.contrib import admin
from .models import Job,Benefit,JobCategory,Qualification,Responsibility,Skill
# Register your models here.

admin.site.register(Job)
admin.site.register(Benefit)
admin.site.register(JobCategory)
admin.site.register(Qualification)
admin.site.register(Responsibility)
admin.site.register(Skill)
