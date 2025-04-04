from rest_framework import serializers
from .models import Job, JobCategory,JobDetail,Applicant, Education, Experience, Certification,ContactUs
import json

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = "__all__"  # Includes 'id' and 'name'

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
    
    