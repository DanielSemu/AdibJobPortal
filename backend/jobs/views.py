# ====================
# Standard Library
# ====================
import csv
from io import  TextIOWrapper

# ====================
# Third-Party Libraries
# ====================
import chardet
from dateutil.parser import parse

# ====================
# Django Core Imports
# ====================
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.timezone import now

# ====================
# Django REST Framework
# ====================
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

# ====================
# Local App Imports
# ====================
from .serializers import (
    JobCategorySerializer,
    ContactUsSerializer,
    JobSerializer
)
from .models import (
    Job,
    ContactUs,
    JobCategory,
    JobDetail,
)
from authApi.permissions import (
    ViewJobRole,
)


#========================
# Admin Manage's Job Post 
#========================
#Job Category
class JobCategoryView(APIView):
    # permission_classes =[IsAuthenticated,ViewJobRole]
    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'DELETE']:
            return [IsAuthenticated(), ViewJobRole()]  # Auth + Role check
        return [AllowAny()]  # <-- 🛠 Allow GET for everyone
    def get(self, request, id=None, *args, **kwargs):
        if id:
            category = get_object_or_404(JobCategory, id=id)  # Get a single category
            serializer = JobCategorySerializer(category)
        else:
            categories = JobCategory.objects.all()  # Get all categories
            serializer = JobCategorySerializer(categories, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = JobCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None, *args, **kwargs):
        category = get_object_or_404(JobCategory, id=id)
        serializer = JobCategorySerializer(category, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None, *args, **kwargs):
        category = get_object_or_404(JobCategory, id=id)
        category.delete()
        return Response({"message": "Job category deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


#Job
class AdminJobView(APIView):
    
    permission_classes =[IsAuthenticated,ViewJobRole]
    
    def get(self, request, id=None, *args, **kwargs):
        if id:
            job = get_object_or_404(Job, id=id)
            serializer = JobSerializer(job)
        else:
            jobs = Job.objects.all()

            # ✅ Handle status filter from query params
            status_param = request.query_params.get("status")
            if status_param:
                jobs = jobs.filter(status=status_param)

            # Optional: Add more filters here (like job_type, category, etc.)
            jobs = jobs.order_by("-updated_at")

            serializer = JobSerializer(jobs, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None, *args, **kwargs):
        job = get_object_or_404(Job, id=id)
        serializer = JobSerializer(job, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # print("Validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None, *args, **kwargs):
        job = get_object_or_404(Job, id=id)
        job.delete()
        return Response({"message": "Job deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


    
class ExpiredJobView(APIView):
    permission_classes =[IsAuthenticated,ViewJobRole]
    def get(self, request, id=None, *args, **kwargs):
        # jobs = Job.objects.filter(status="Active",application_deadline__lt=timezone.now().date())
        jobs = Job.objects.filter(status="Active")

        serializer = JobSerializer(jobs, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class JobBulkUploadView(APIView):
    permission_classes = [IsAuthenticated, ViewJobRole]

    def post(self, request, *args, **kwargs):
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Detect encoding from sample
        sample = csv_file.read(1024)
        encoding = chardet.detect(sample)['encoding'] or 'utf-8'
        csv_file.seek(0)  # rewind

        decoded_file = TextIOWrapper(csv_file.file, encoding=encoding)
        reader = csv.DictReader(decoded_file)

        jobs_to_create = []
        errors = []
        row_number = 1  # for clearer error messages

        for row in reader:
            try:
                row_number += 1

                # Check for required fields
                required_fields = ['title', 'category', 'location', 'job_type', 'description', 'application_deadline', 'post_date']
                for field in required_fields:
                    if not row.get(field):
                        raise ValueError(f"Missing required field '{field}'.")

                try:
                    category_obj = JobCategory.objects.get(name=row['category'])
                except JobCategory.DoesNotExist:
                    raise ValueError(f"Category '{row['category']}' not found.")

                try:
                    parsed_deadline = parse(row['application_deadline'], dayfirst=False).date()
                    parsed_post_date = parse(row['post_date'], dayfirst=False).date()
                except Exception:
                    raise ValueError("Invalid date format in 'application_deadline' or 'post_date'.")

                job = Job(
                    vacancy_number=row.get('vacancy_number') or None,
                    title=row['title'],
                    job_grade=row.get('job_grade') or None,
                    company=row.get('company') or "Addis Bank S.C",
                    category=category_obj,
                    location=row['location'],
                    job_type=row['job_type'],
                    salary=row.get('salary') or "As per Companies Salary Scale",
                    description=row['description'],
                    post_date=parsed_post_date,
                    application_deadline=parsed_deadline,
                    show_experience=str(row.get('show_experience', 'True')).lower() == 'true',
                    status=row.get('status') or "InActive",
                    created_at=now(),
                    updated_at=now()
                )

                jobs_to_create.append(job)

            except Exception as e:
                errors.append({"row": row_number, "error": str(e)})

        if errors:
            return Response(
                {"message": "Some rows could not be processed.", "errors": errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        Job.objects.bulk_create(jobs_to_create)
        return Response({"message": f"{len(jobs_to_create)} jobs uploaded successfully!"}, status=status.HTTP_201_CREATED)
class JobDetailBulkUploadView(APIView):
    permission_classes =[IsAuthenticated,ViewJobRole]
    def post(self, request, job_id, *args, **kwargs):
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Read small sample for encoding detection
        sample = csv_file.read(1024)
        encoding = chardet.detect(sample)['encoding'] or 'utf-8'

        # Go back to beginning of file
        csv_file.seek(0)

        decoded_file = TextIOWrapper(csv_file.file, encoding=encoding)
        reader = csv.DictReader(decoded_file)

        # 🔵 Get the Job once
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": f"Job with id '{job_id}' not found."},
                            status=status.HTTP_400_BAD_REQUEST)

        details_to_create = []

        for row in reader:
            detail = JobDetail(
                job=job,
                detail_type=row['detail_type'],
                description=row['description'],
            )
            details_to_create.append(detail)

        JobDetail.objects.bulk_create(details_to_create)

        return Response({"message": "Job Details uploaded successfully!"}, status=status.HTTP_201_CREATED)



#===============
#User's Job View
#===============
class JobView(APIView):
    def get(self, request, id=None, *args, **kwargs):
        if id:
            job = get_object_or_404(Job, id=id)  # Get a single job
            serializer = JobSerializer(job)
        else:
            today = timezone.now().date()
            jobs = Job.objects.filter(
            status="Active",
            post_date__lte=today,
            application_deadline__gte=today
            )
            serializer = JobSerializer(jobs, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)



class ContactUsAPIView(APIView):  
    # ✅ GET: Retrieve all contact messages  
    def get(self, request, *args, **kwargs):  
        contacts = ContactUs.objects.all()  
        serializer = ContactUsSerializer(contacts, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK)  

    # ✅ POST: Create a new contact message  
    def post(self, request, *args, **kwargs):  
        print(request.data)
        serializer = ContactUsSerializer(data=request.data)  
        if serializer.is_valid():  
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

    # ✅ PUT: Update an existing contact message  
    def put(self, request, *args, **kwargs):  
        contact_id = kwargs.get('pk')  
        try:  
            contact = ContactUs.objects.get(pk=contact_id)  
        except ContactUs.DoesNotExist:  
            return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)  

        serializer = ContactUsSerializer(contact, data=request.data, partial=True)  
        if serializer.is_valid():  
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_200_OK)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

    # ✅ DELETE: Remove a contact message  
    def delete(self, request, *args, **kwargs):  
        contact_id = kwargs.get('pk')  
        try:  
            contact = ContactUs.objects.get(pk=contact_id)  
            contact.delete()  
            return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)  
        except ContactUs.DoesNotExist:  
            return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)  

