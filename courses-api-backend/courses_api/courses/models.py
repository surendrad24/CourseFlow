#from django.db import models

# Create your models here.
from django.db import models

class Course(models.Model):
    title       = models.CharField(max_length=255)
    course_code = models.CharField(max_length=20)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Instance(models.Model):
    #course       = models.ForeignKey(Course, related_name='instances', on_delete=models.CASCADE)
    course   = models.ForeignKey(Course, on_delete=models.CASCADE)
    year     = models.PositiveIntegerField()
    semester = models.PositiveSmallIntegerField()
    #start_date   = models.DateField()
    #end_date     = models.DateField()
    #max_students = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.course.title} — {self.year} sem {self.semester}"
