# ====================
# Standard Library
# ====================
import csv
from io import  TextIOWrapper
import requests
import urllib.parse
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
from rest_framework.decorators import api_view, permission_classes

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
    IsHrMakerRole,
    IsHrCheckerRole
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
    #override get_permission method 
    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated(), ViewJobRole()]
        elif self.request.method == "POST" or self.request.method == "PUT":
            return [IsAuthenticated(), ViewJobRole()]
        return super().get_permissions()

    def get(self, request, id=None, *args, **kwargs):
        if id:
            job = get_object_or_404(Job, id=id)
            serializer = JobSerializer(job)
        else:
            jobs = Job.objects.all()

            # ✅ Filter by status
            status_param = request.query_params.get("status")
            if status_param:
                jobs = jobs.filter(status=status_param)

            # ✅ Filter by category
            category_param = request.query_params.get("category")
            if category_param:
                jobs = jobs.filter(category=int(category_param))

            jobs = jobs.order_by("-updated_at")
            serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id=None, *args, **kwargs):
        if id is not None:
            return Response(
                {"error": "POST request should not include an ID."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, id=None, *args, **kwargs):
        job = get_object_or_404(Job, id=id)
        user = request.user

        user_role = getattr(user, 'role', None)  # Adjust if needed
        # Always update operations is done status should changed to 
        if user_role == "hr_maker":
            # Allow updating fields, but force status to "Draft"
            data = request.data.copy()
            data["status"] = "Draft"
            serializer = JobSerializer(job, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Only Authorize the job 
        elif user_role == "hr_checker":
            new_status = request.data.get("status")
            if new_status != "Active":
                return Response({"error": "hr_checker can only set status to 'Active'."},
                        status=status.HTTP_403_FORBIDDEN)
            # Directly update model without serializer validation
            job.status = "Active"
            job.save()
            serializer = JobSerializer(job)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response({"error": "You are not authorized to update this job."},
                            status=status.HTTP_403_FORBIDDEN)


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




class SendSMSView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        recipient_data = request.data.get("recipient")
        message = request.data.get("message")

        if not recipient_data or not message:
            return Response({"error": "Missing recipient or message"}, status=status.HTTP_400_BAD_REQUEST)

        encoded_message = urllib.parse.quote(message)
        base_url = (
            "http://192.168.6.27:9501/api?action=sendmessage"
            "&username=Test&password=Adib@123"
            "&messagetype=SMS:TEXT"
            f"&messagedata={encoded_message}"
        )

        results = []

        # Handle multiple or single recipient
        if isinstance(recipient_data, list):
            # Multiple recipients: send one-by-one
            for number in recipient_data:
                url = f"{base_url}&recipient={number}"
                
                try:
                    response = requests.get(url)
                    results.append({
                        "recipient": number,
                        "status": "sent",
                        "provider_response": response.text
                    })
                except Exception as e:
                    results.append({
                        "recipient": number,
                        "status": "failed",
                        "error": str(e)
                    })
        else:
            # Single recipient
            url = f"{base_url}&recipient={recipient_data}"
            try:
                response = requests.get(url)
                results.append({
                    "recipient": recipient_data,
                    "status": "sent",
                    "provider_response": response.text
                })
            except Exception as e:
                results.append({
                    "recipient": recipient_data,
                    "status": "failed",
                    "error": str(e)
                })

        return Response({"status": "completed", "results": results}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def generate_applicants_pdf(request):
    job_id = request.GET.get("job_id")

    if job_id:
        applicants = Applicant.objects.filter(status="Accepted", job_id=job_id)
        print(applicants)
    else:
        applicants = Applicant.objects.filter(status="Accepted")
    job=Job.objects.get(id=job_id)
    template = get_template("applicants_report.html")
    html = template.render({"applicants": applicants,"job":job})

    result = io.BytesIO()
    pdf = pisa.pisaDocument(io.BytesIO(html.encode("UTF-8")), result)

    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return HttpResponse("PDF generation failed", status=500)

class ExportEmployeeDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Applicant.objects.filter(status="Accepted")

    def get(self, request):
        applications = self.get_queryset()
        if not applications.exists():
            return Response({"message": "No applications found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ApplicantSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        applications = self.get_queryset()
        if not applications.exists():
            return Response({"message": "No applications found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ApplicantSerializer(applications, many=True)
        employees = serializer.data

        wb = Workbook()
        ws = wb.active
        ws.title = "Employees"

        headers = [
            "No", "Full Name", "Gender", "Birth Date", "Applied For", "Work Place", "Status",
            "Edu-Organization", "Edu-Level", "Filed-Study",
            "Job-Position", "Organization", "From", "To", "Banking Experience",
            "Certificate-Title", "Company"
        ]
        ws.append(headers)

        for col in range(1, len(headers) + 1):
            ws.cell(row=1, column=col).font = Font(bold=True)
            ws.cell(row=1, column=col).alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

        row_index = 2
        for i, emp in enumerate(employees, start=1):
            educations = emp.get("educations", [])
            experiences = emp.get("experiences", [])
            certifications = emp.get("certifications", [])

            max_len = max(len(educations), len(experiences), len(certifications))

            for j in range(max_len):
                edu = educations[j] if j < len(educations) else {}
                exp = experiences[j] if j < len(experiences) else {}
                cert = certifications[j] if j < len(certifications) else {}

                ws.cell(row_index, 8, edu.get("education_organization", ""))
                ws.cell(row_index, 9, edu.get("education_level", ""))
                ws.cell(row_index, 10, edu.get("field_of_study", ""))

                ws.cell(row_index, 11, exp.get("job_title", ""))
                ws.cell(row_index, 12, exp.get("company_name", ""))
                ws.cell(row_index, 13, exp.get("from_date", ""))
                ws.cell(row_index, 14, exp.get("to_date", ""))
                ws.cell(row_index, 15, exp.get("banking_experience", ""))

                ws.cell(row_index, 16, cert.get("certificate_title", ""))
                ws.cell(row_index, 17, cert.get("awarding_company", ""))

                if j == 0:
                    ws.cell(row_index, 1, i)
                    ws.cell(row_index, 2, emp["full_name"])
                    ws.cell(row_index, 3, emp["gender"])
                    ws.cell(row_index, 4, emp["birth_date"])
                    ws.cell(row_index, 5, emp["job_name"])
                    ws.cell(row_index, 6, emp["selected_work_place"])
                    ws.cell(row_index, 7, emp["status"])

                row_index += 1

            for col in [1, 2, 3, 4, 5, 6, 7]:
                ws.merge_cells(start_row=row_index - max_len, start_column=col, end_row=row_index - 1, end_column=col)
                ws.cell(row=row_index - max_len, column=col).alignment = Alignment(vertical="top", wrap_text=True)

        column_widths = [5, 25, 15, 15, 20, 20, 20, 25, 25, 25, 12, 20, 15, 15, 12, 20, 20]
        for i, width in enumerate(column_widths, start=1):
            ws.column_dimensions[get_column_letter(i)].width = width

        response = HttpResponse(content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        response['Content-Disposition'] = 'attachment; filename="employee_export.xlsx"'
        wb.save(response)

        return response




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

