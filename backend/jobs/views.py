from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404
from .serializers import JobSerializer, ResponsibilitySerializer, QualificationSerializer, SkillSerializer, BenefitSerializer
from .models import Job, Responsibility, Qualification, Skill, Benefit


class JobView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, id=None, *args, **kwargs):
        if id:
            job = get_object_or_404(Job, id=id)  # Get single job
            serializer = JobSerializer(job)
        else:
            jobs = Job.objects.all()  # Get all jobs
            serializer = JobSerializer(jobs, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        job_id = kwargs.get('pk')
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = JobSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResponsibilityView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        responsibilities = Responsibility.objects.filter(job_id=job_id)
        serializer = ResponsibilitySerializer(responsibilities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        serializer = ResponsibilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job_id=job_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QualificationView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        qualifications = Qualification.objects.filter(job_id=job_id)
        serializer = QualificationSerializer(qualifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        serializer = QualificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job_id=job_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SkillView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        skills = Skill.objects.filter(job_id=job_id)
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job_id=job_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BenefitView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        benefits = Benefit.objects.filter(job_id=job_id)
        serializer = BenefitSerializer(benefits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        job_id = kwargs.get('job_id')
        serializer = BenefitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job_id=job_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
