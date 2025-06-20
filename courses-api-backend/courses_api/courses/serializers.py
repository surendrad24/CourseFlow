from rest_framework import serializers
from .models import Course, Instance

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'course_code', 'description']

class InstanceSerializer(serializers.ModelSerializer):
    # sends/accepts the course ID as an integer
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Instance
        fields = ['year', 'semester', 'course']
        # composite uniqueness (optional) so you can’t duplicate the same year/semester/course
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Instance.objects.all(),
                fields=['year', 'semester', 'course']
            )
        ]
