from django.urls import path
from . import views

urlpatterns = [
    # Courses
    path('courses/',                       views.CourseListCreateAPI.as_view()),
    path('courses/<int:pk>/',              views.CourseRetrieveDestroyAPI.as_view()),

    # Instances
    path('instances/',                     views.InstanceCreateAPI.as_view()),
    path('instances/<int:year>/<int:semester>/', 
                                           views.InstanceListByYearSemesterAPI.as_view()),
    path('instances/<int:year>/<int:semester>/<int:course_id>/',
                                           views.InstanceRetrieveDestroyAPI.as_view()),
]
