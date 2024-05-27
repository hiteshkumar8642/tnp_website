from rest_framework import serializers
from .models import College,Course,CollegeCourse,Company,Shared_Company,Shared_HR_contact,HRContact,CallHistory,UserDetails,Application,AppliedCompany,UserProfile,Announcement


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College 
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course 
        fields = '__all__'

class College_CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeCourse 
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company 
        fields = '__all__'

class Shared_CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Shared_Company 
        fields = '__all__'

class Shared_HR_contactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shared_HR_contact
        fields = '__all__'

class HRContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRContact
        fields = '__all__'

class CallHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CallHistory
        fields = '__all__'

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class AppliedCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = AppliedCompany
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

