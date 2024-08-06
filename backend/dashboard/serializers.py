from rest_framework import serializers
from django.contrib.auth.models import User
from .models import College, Course, CollegeCourse, Company, Shared_Company, Shared_HR_contact, HRContact, CallHistory, UserDetails, Application, AppliedCompany, UserProfile, Announcement

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name', 'subdomain', 'is_verified']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'degree', 'specialization', 'course_duration']

class CollegeCourseSerializer(serializers.ModelSerializer):
    college = CollegeSerializer()
    course = CourseSerializer()

    class Meta:
        model = CollegeCourse
        fields = ['id', 'college', 'course']

class CompanySerializer(serializers.ModelSerializer):
    allowed_courses = CourseSerializer(many=True, read_only=True)
    poc = CollegeCourseSerializer(read_only=True)
    college_branch = CollegeCourseSerializer(read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'allowed_courses', 'poc', 'general_ctc', 'college_ctc', 'college_branch', 'time_of_visit']

class SharedCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Shared_Company
        fields = ['id', 'company_name', 'company_email', 'college_branch', 'user']

class SharedHRContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shared_HR_contact
        fields = ['id', 'name', 'company_name', 'email', 'contact_number', 'college_branch', 'user']

class HRContactSerializer(serializers.ModelSerializer):
    company_id = CompanySerializer(read_only=True)
    assigned = UserSerializer(read_only=True)
    reassigned = UserSerializer(read_only=True)
    college_branch = CollegeCourseSerializer(read_only=True)

    class Meta:
        model = HRContact
        fields = ['id', 'name', 'linkedin', 'mobile_numbers', 'mail_id', 'company_id', 'gender', 'last_date_of_contact', 'next_date_of_contact', 'college_branch', 'assigned', 'reassigned', 'status']

class CallHistorySerializer(serializers.ModelSerializer):
    hr_id = HRContactSerializer()
    student_id = UserSerializer()
    college_branch = CollegeCourseSerializer()

    class Meta:
        model = CallHistory
        fields = ['id', 'hr_id', 'student_id', 'comment', 'colour', 'college_branch']

class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    resume = serializers.FileField()
    photo = serializers.ImageField()

    class Meta:
        model = UserDetails
        fields = ['id', 'user', 'resume', 'photo', 'backlogs', 'graduation_cgpa', 'twelfth_percentage', 'tenth_percentage', 'current_cgpa', 'other_website_link', 'leetcode_profile', 'codechef_profile', 'codeforces_profile', 'github_profile', 'portfolio_link', 'linkedin_profile', 'department', 'gap_after_twelfth', 'gap_after_graduation', 'mobile', 'is_placed', 'is_verified', 'college_branch']

class ApplicationSerializer(serializers.ModelSerializer):
    company_id = CompanySerializer()
    allowed_branch = CourseSerializer(many=True)
    college_branch = CollegeCourseSerializer()

    class Meta:
        model = Application
        fields = ['id', 'last_date', 'position', 'company_id', 'predicted_visit_date', 'twelfth_marks_eligibility', 'tenth_marks_eligibility', 'allowed_branch', 'college_branch', 'job_description', 'is_intern', 'is_ppo', 'is_fte', 'is_spp', 'is_sip', 'twelfth_gap', 'graduation_gap', 'backlogs', 'graduation_marks', 'current_cgpa']

class AppliedCompanySerializer(serializers.ModelSerializer):
    application_id = ApplicationSerializer()
    user_id = UserSerializer()

    class Meta:
        model = AppliedCompany
        fields = ['id', 'application_id', 'user_id', 'is_selected', 'comment']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    college = CollegeSerializer()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'role', 'college', 'is_verified']

class AnnouncementSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    college_branch = CollegeCourseSerializer()

    class Meta:
        model = Announcement
        fields = ['id', 'created', 'updated', 'user', 'announcement', 'college_branch']
