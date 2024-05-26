from rest_framework import serializers
from .models import College,Course

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College 
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course 
        fields = '__all__'
