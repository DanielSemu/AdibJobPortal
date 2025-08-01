from .models import Applicant,Experience, Certification,Criteria,Education
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
    experiences = ExperienceSerializer(many=True, required=False)
    educations = EducationSerializer(many=True, required=False)
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
        educations_data = self._parse_json_field(self.initial_data.get("educations", []))
        experiences_data = self._parse_json_field(self.initial_data.get("experiences", []))
        certifications_data = self._parse_json_field(self.initial_data.get("certifications", []))

        # Remove nested lists from validated_data so they don't get passed to Applicant.objects.create
        validated_data.pop('educations', None)
        validated_data.pop('experiences', None)
        validated_data.pop('certifications', None)

        # Check duplicate application (same as your code)
        email = validated_data.get('email')
        job_id = validated_data.get('job')

        if Applicant.objects.filter(email=email, job_id=job_id).exists():
            raise serializers.ValidationError(
                {"error": "You have already applied for this job."}
            )

        application = Applicant.objects.create(**validated_data)

        for education in educations_data:
            Education.objects.create(applicant=application, **education)

        for experience in experiences_data:
            Experience.objects.create(applicant=application, **experience)

        for certification in certifications_data:
            Certification.objects.create(applicant=application, **certification)

        return application
    def _parse_json_field(self, json_field):
        import json
        try:
            if isinstance(json_field, str):
                return json.loads(json_field)
            return json_field
        except json.JSONDecodeError:
            return []


class CriteriaSerializer(serializers.ModelSerializer):
    job_name = serializers.SerializerMethodField() 
    class Meta:
        model=Criteria
        fields='__all__'
        extra_kwargs = {"applicant": {"read_only": True}}
        
    def get_job_name(self, obj):
        # This method returns the name of the related job
        return obj.job.title  # Adjust the attribute name according to your `Job` model
