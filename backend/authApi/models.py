from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, full_name, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        user = self.model(username=username, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, full_name, password, **extra_fields)



class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom user model"""
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('hr_maker', 'HR Maker'),
        ('hr_checker', 'HR Checker'),
        ('user', 'User'),
    ]

    username = models.CharField(max_length=150, unique=True)  # <- NEW
    email = models.EmailField(unique=False, null=True, blank=True)  # <- optional now
    full_name = models.CharField(max_length=255)
    department = models.CharField(max_length=255, null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15)

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'  # <- changed from email
    REQUIRED_FIELDS = ['full_name']  # keep required fields

    def __str__(self):
        return self.username



# Now define ApplicantUser for applicants with email login:
class ApplicantUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Applicants must have an email")
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class ApplicantUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    birthdate = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    gender = models.CharField(max_length=1, choices=[('M','Male'),('F','Female'),('O','Other')], blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    # 👇 Add these two fields
    failed_login_attempts = models.PositiveIntegerField(default=0)
    locked_until = models.DateTimeField(null=True, blank=True)

    objects = ApplicantUserManager()  # <-- important!

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email
