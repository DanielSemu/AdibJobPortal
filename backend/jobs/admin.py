from django.contrib import admin
from .models import Job,ContactUs,JobDetail,JobCategory
# Register your models here.

admin.site.register(Job)
admin.site.register(JobCategory)
admin.site.register(JobDetail)
admin.site.register(ContactUs)
