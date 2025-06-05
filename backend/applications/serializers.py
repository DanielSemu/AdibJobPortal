from .models import Job,Applicant, Education, Experience, Certification
from rest_framework import serializers
import json



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
