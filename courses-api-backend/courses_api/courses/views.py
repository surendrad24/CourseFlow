from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Course, Instance
from .serializers import CourseSerializer, InstanceSerializer

# — Courses — 
class CourseListCreateAPI(generics.ListCreateAPIView):
    """
    GET  /api/courses/        → list all courses
    POST /api/courses/        → create a new course
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseRetrieveDestroyAPI(generics.RetrieveDestroyAPIView):
    """
    GET    /api/courses/{id}/   → retrieve course details
    DELETE /api/courses/{id}/   → delete a course
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# — Instances — 
class InstanceCreateAPI(generics.CreateAPIView):
    """
    POST /api/instances/   → create a new course delivery instance
    """
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer

class InstanceListByYearSemesterAPI(generics.ListAPIView):
    """
    GET /api/instances/{year}/{semester}/
      → list all instances for that year & semester
    """
    serializer_class = InstanceSerializer

    def get_queryset(self):
        year = self.kwargs['year']
        semester = self.kwargs['semester']
        return Instance.objects.filter(year=year, semester=semester)

class InstanceRetrieveDestroyAPI(generics.RetrieveDestroyAPIView):
    """
    GET    /api/instances/{year}/{semester}/{course_id}/
      → details of one instance
    DELETE /api/instances/{year}/{semester}/{course_id}/
      → delete that instance
    """
    serializer_class = InstanceSerializer

    def get_object(self):
        year      = self.kwargs['year']
        semester  = self.kwargs['semester']
        course_id = self.kwargs['course_id']
        return Instance.objects.get(
            year=year,
            semester=semester,
            course_id=course_id
        )
