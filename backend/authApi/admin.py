from django.contrib import admin
from .models import CustomUser,ApplicantUser
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ApplicantUser)