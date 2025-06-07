from rest_framework import serializers
from .models import Job, JobCategory,JobDetail,ContactUs


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
        instance.status = "Draft"
        instance.save()

        # Update job details
        instance.details.all().delete()  # Remove old details
        for detail in details_data:
            JobDetail.objects.create(job=instance, **detail)

        return instance



    
    
class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model =ContactUs
        fields= '__all__'
    
  