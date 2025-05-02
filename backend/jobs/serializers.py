from rest_framework import serializers
from .models import Job, JobCategory,JobDetail,Applicant, Education, Experience, Certification,ContactUs
import json

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = "__all__"  

class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDetail
        fields = ["detail_type", "description"]

class JobSerializer(serializers.ModelSerializer):
    details = JobDetailSerializer(many=True)

    class Meta:
        model = Job
        fields = "__all__"

    def create(self, validated_data):
        details_data = validated_data.pop('details', [])
        job = Job.objects.create(**validated_data)
        for detail in details_data:
            JobDetail.objects.create(job=job, **detail)
        return job

    def update(self, instance, validated_data):
        details_data = validated_data.pop('details', [])
        instance.title = validated_data.get('title', instance.title)
        instance.job_grade = validated_data.get('job_grade', instance.job_grade)
        instance.company = validated_data.get('company', instance.company)
        instance.category = validated_data.get('category', instance.category)
        instance.location = validated_data.get('location', instance.location)
        instance.job_type = validated_data.get('job_type', instance.job_type)
        instance.salary = validated_data.get('salary', instance.salary)
        instance.description = validated_data.get('description', instance.description)
        instance.application_deadline = validated_data.get('application_deadline', instance.application_deadline)
        instance.post_date = validated_data.get('post_date', instance.post_date)
        instance.show_experience = validated_data.get('show_experience', instance.show_experience)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        # Update job details
        instance.details.all().delete()  # Remove old details
        for detail in details_data:
            JobDetail.objects.create(job=instance, **detail)

        return instance




class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        extra_kwargs = {"applicant": {"read_only": True}}

class ExperienceSerializer(serializers.ModelSerializer):
    banking_experience = serializers.BooleanField()

    class Meta:
        model = Experience
        fields = '__all__'
        extra_kwargs = {"applicant": {"read_only": True}}

   




class CertificationSerializer(serializers.ModelSerializer):
    # certificate_file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Certification
        fields = '__all__'
        extra_kwargs = {"applicant": {"read_only": True}}
        
        
        
        
        
        

class ApplicantSerializer(serializers.ModelSerializer):
    educations = EducationSerializer(many=True, required=False)
    experiences = ExperienceSerializer(many=True, required=False)
    certifications = CertificationSerializer(many=True, required=False)
    resume = serializers.FileField(required=False, allow_null=True)
    job_name = serializers.SerializerMethodField()  # Add this line to include the job name

    class Meta:
        model = Applicant
        fields = '__all__'
        
    def get_job_name(self, obj):
        # This method returns the name of the related job
        return obj.job.title  # Adjust the attribute name according to your `Job` model

    def create(self, validated_data):
        email = validated_data.get('email')
        job_id = validated_data.get('job')

        if Applicant.objects.filter(email=email, job_id=job_id).exists():
            raise serializers.ValidationError(
                {"error": "You have already applied for this job."}
            )

        # ✅ Use `self.initial_data` instead of `self.context['request']`
        educations_data = self._parse_json_field(self.initial_data.get('educations', '[]'))
        experiences_data = self._parse_json_field(self.initial_data.get('experiences', '[]'))
        certifications_data = self._parse_json_field(self.initial_data.get('certifications', '[]'))

        # Create main Applicant object
        applicant = Applicant.objects.create(**validated_data)

        # Create related objects
        for education in educations_data:
            Education.objects.create(applicant=applicant, **education)

        for experience in experiences_data:
            Experience.objects.create(applicant=applicant, **experience)
            
        for certification in certifications_data:
            Certification.objects.create(applicant=applicant, **certification)

        return applicant

    def _parse_json_field(self, json_field):
        """Helper function to parse JSON string into Python list."""
        try:
            return json.loads(json_field) if isinstance(json_field, str) else json_field
        except json.JSONDecodeError:
            return []
    
    
class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model =ContactUs
        fields= '__all__'
    
    
    
#     from django.http import HttpResponse
# from openpyxl import Workbook
# from openpyxl.styles import Alignment, Font

# def export_employee_data(request):
#     # Sample data — replace with queryset or real data from DB
#     applicants = [
#         {
#             "full_name": "John Doe",
#             "email": "john@example.com",
#             "phone": "1234567890",
#             "gender": "Male",
#             "birth_date": "1990-01-01",
#             "selected_work_place": "Addis Ababa",
#             "educations": [
#                 {"institution": "Unity University", "degree": "BSc", "year": "2012"},
#                 {"institution": "AAU", "degree": "MSc", "year": "2015"},
#                 {"institution": "AAU", "degree": "MSc", "year": "2015"},
#                 {"institution": "AAU", "degree": "MSc", "year": "2015"}
#             ],
#             "experiences": [
#                 {"company": "XYZ Bank", "position": "Cashier", "duration": "3 years"},
#                 {"company": "ABC Corp", "position": "Manager", "duration": "2 years"},
#                 {"company": "ABC Corp", "position": "Manager", "duration": "2 years"},
#             ],
#             "certifications": [
#                 {"title": "Project Management", "year": "2018"},
#                 {"title": "Data Analytics", "year": "2020"}
#             ]
#         },
#         {
#             "full_name": "John Doe",
#             "email": "john@example.com",
#             "phone": "1234567890",
#             "gender": "Male",
#             "birth_date": "1990-01-01",
#             "contact_consent": True,
#             "cover_letter": "Looking forward to joining.",
#             "resume": "resume_john.pdf",
#             "terms_accepted": True,
#             "selected_work_place": "Addis Ababa",
#             "educations": [
#                 {"institution": "Unity University", "degree": "BSc", "year": "2012"},
#                 {"institution": "AAU", "degree": "MSc", "year": "2015"}
#             ],
#             "experiences": [
#                 {"company": "XYZ Bank", "position": "Cashier", "duration": "3 years"},
#                 {"company": "ABC Corp", "position": "Manager", "duration": "2 years"}
#             ],
#             "certifications": [
#                 {"title": "Project Management", "year": "2018"},
#                 {"title": "Data Analytics", "year": "2020"}
#             ]
#         }
#     ]

#     # Create a workbook and worksheet
#     wb = Workbook()
#     ws = wb.active
#     ws.title = "Applicants"

#     headers = [
#         "Full Name", "Email", "Phone", "Gender", "Birth Date", "Preferred Branch",
#         "Education - Institution", "Education - Degree", "Education - Year",
#         "Experience - Company", "Experience - Position", "Experience - Duration",
#         "Certification - Title", "Certification - Year"
#     ]
#     ws.append(headers)

#     for col in ws.iter_cols(min_row=1, max_row=1):
#         for cell in col:
#             cell.font = Font(bold=True)
#             cell.alignment = Alignment(horizontal='center', wrap_text=True)

#     current_row = 2
#     for applicant in applicants:
#         max_rows = max(
#             len(applicant.get("educations", [])),
#             len(applicant.get("experiences", [])),
#             len(applicant.get("certifications", [])),
#             1
#         )
#         for i in range(max_rows):
#             row = []

#             if i == 0:
#                 row.extend([
#                     applicant["full_name"],
#                     applicant["email"],
#                     applicant["phone"],
#                     applicant["gender"],
#                     applicant["birth_date"],
#                     applicant["selected_work_place"]
#                 ])
#             else:
#                 row.extend([""] * 10)

#             # Education
#             if i < len(applicant["educations"]):
#                 edu = applicant["educations"][i]
#                 row.extend([edu["institution"], edu["degree"], edu["year"]])
#             else:
#                 row.extend([""] * 3)

#             # Experience
#             if i < len(applicant["experiences"]):
#                 exp = applicant["experiences"][i]
#                 row.extend([exp["company"], exp["position"], exp["duration"]])
#             else:
#                 row.extend([""] * 3)

#             # Certification
#             if i < len(applicant["certifications"]):
#                 cert = applicant["certifications"][i]
#                 row.extend([cert["title"], cert["year"]])
#             else:
#                 row.extend([""] * 2)

#             ws.append(row)

#         # Merge personal data columns if needed
#         if max_rows > 1:
#             for col in range(1, 11):
#                 ws.merge_cells(start_row=current_row, start_column=col, end_row=current_row + max_rows - 1, end_column=col)
#                 ws.cell(row=current_row, column=col).alignment = Alignment(vertical='top', wrap_text=True)

#         current_row += max_rows

#     # Adjust column widths
#     for column_cells in ws.columns:
#         length = max(len(str(cell.value)) if cell.value else 0 for cell in column_cells)
#         col_letter = column_cells[0].column_letter
#         ws.column_dimensions[col_letter].width = length + 2

#     # Create HTTP response with Excel file
#     response = HttpResponse(
#         content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
#     )
#     response['Content-Disposition'] = 'attachment; filename="applicants.xlsx"'
#     wb.save(response)
#     return response
