from django.contrib import admin
from .models import Applicant,Certification,Experience,TempApplicant,Criteria
# Register your models here.


admin.site.register(Applicant)
admin.site.register(Experience)
admin.site.register(Certification)
# admin.site.register(Education)
admin.site.register(TempApplicant)

admin.site.register(Criteria)
