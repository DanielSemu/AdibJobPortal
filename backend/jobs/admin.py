from django.contrib import admin
from .models import Job,Applicant,Certification,Education,Experience,ContactUs,JobDetail,JobCategory,TempApplicant,Criteria
# Register your models here.

admin.site.register(Job)
admin.site.register(JobCategory)
admin.site.register(JobDetail)

admin.site.register(Applicant)
admin.site.register(Experience)
admin.site.register(Certification)
admin.site.register(Education)
admin.site.register(TempApplicant)
admin.site.register(ContactUs)
admin.site.register(Criteria)
