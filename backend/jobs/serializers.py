from rest_framework import serializers
from .models import Job, Responsibility, Qualification, Skill, Benefit, JobCategory,Applicant, Education, Experience, Certification

class ResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibility
        fields = ["id", "responsibility"]

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = ["id", "qualification"]

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "skill"]

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = ["id", "benefit"]

class JobSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=JobCategory.objects.all())  # Allow category assignment by primary key
    responsibilities = ResponsibilitySerializer(many=True, required=False)  # Allow adding responsibilities
    qualifications = QualificationSerializer(many=True, required=False)  # Allow adding qualifications
    skills = SkillSerializer(many=True, required=False)  # Allow adding skills
    benefits = BenefitSerializer(many=True, required=False)  # Allow adding benefits

    class Meta:
        model = Job
        fields = [
            "id", "title", "company", "category", "location", "type",
            "salary", "description", "application_deadline","status",
            "responsibilities", "qualifications", "skills", "benefits","how_to_apply"
        ]

    def create(self, validated_data):
        responsibilities_data = validated_data.pop("responsibilities", [])
        qualifications_data = validated_data.pop("qualifications", [])
        skills_data = validated_data.pop("skills", [])
        benefits_data = validated_data.pop("benefits", [])

        # Create Job instance
        job = Job.objects.create(**validated_data)

        # Handle responsibilities
        for responsibility_data in responsibilities_data:
            Responsibility.objects.create(job=job, **responsibility_data)

        # Handle qualifications
        for qualification_data in qualifications_data:
            Qualification.objects.create(job=job, **qualification_data)

        # Handle skills
        for skill_data in skills_data:
            Skill.objects.create(job=job, **skill_data)

        # Handle benefits
        for benefit_data in benefits_data:
            Benefit.objects.create(job=job, **benefit_data)

        return job

    def update(self, instance, validated_data):
        responsibilities_data = validated_data.pop("responsibilities", [])
        qualifications_data = validated_data.pop("qualifications", [])
        skills_data = validated_data.pop("skills", [])
        benefits_data = validated_data.pop("benefits", [])

        # Update Job instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update responsibilities
        for responsibility_data in responsibilities_data:
            Responsibility.objects.create(job=instance, **responsibility_data)

        # Update qualifications
        for qualification_data in qualifications_data:
            Qualification.objects.create(job=instance, **qualification_data)

        # Update skills
        for skill_data in skills_data:
            Skill.objects.create(job=instance, **skill_data)

        # Update benefits
        for benefit_data in benefits_data:
            Benefit.objects.create(job=instance, **benefit_data)

        return instance






class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        extra_kwargs = {"applicant": {"read_only": True}}

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        extra_kwargs = {"applicant": {"read_only": True}}

class CertificationSerializer(serializers.ModelSerializer):
    certificate_file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Certification
        fields = '__all__'
        extra_kwargs = {"applicant": {"read_only": True}}
        
        
        
        
        
        

class ApplicantSerializer(serializers.ModelSerializer):
    educations = EducationSerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    certifications = CertificationSerializer(many=True, required=False)
    resume = serializers.FileField(required=False,  allow_null=True)

    class Meta:
        model = Applicant
        fields = '__all__'

    def validate_email(self, value):
        if Applicant.objects.filter(email=value).exists():
            raise serializers.ValidationError("An applicant with this email already exists.")
        return value

    def create(self, validated_data):
        educations_data = validated_data.pop('educations', [])
        experiences_data = validated_data.pop('experiences', [])
        certifications_data = validated_data.pop('certifications', [])

        applicant = Applicant.objects.create(**validated_data)

        for education in educations_data:
            Education.objects.create(applicant=applicant, **education)

        for experience in experiences_data:
            Experience.objects.create(applicant=applicant, **experience)

        for certification in certifications_data:
            Certification.objects.create(applicant=applicant, **certification)

        return applicant