from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from dashboard.models import College,Course

class createUserForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Enter a valid email address.')
    college_names = College.objects.all()
    college_choices = [(college.name, college.name) for college in college_names]
    college = forms.ChoiceField(choices=[('', '---Select your college---')] + college_choices, required=True)
    class Meta:
        model = User
        fields = ['college','first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('This email address is already in use.')
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('This username is already in use.')
        return username


class CollegeRegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Enter a valid email address.')
    college1 = forms.CharField(max_length=100, required=True)
    college2 = forms.CharField(max_length=100, required=True)
    subdomain = forms.CharField(max_length=100, required = False)
    BRANCH_CHOICES = [(course.id,course.degree) for course in Course.objects.all()]
    branches = forms.MultipleChoiceField(label="Select branches", choices=BRANCH_CHOICES, widget=forms.SelectMultiple, required=True)
    class Meta:
        model = User
        fields = ['college1', 'college2', 'subdomain', 'branches', 'first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('This email address is already in use.')
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('This username is already in use.')
        return username

    def clean(self):
        cleaned_data = super().clean()
        college1 = cleaned_data.get('college1')
        college2 = cleaned_data.get('college2')
        if college1 != college2:
            raise forms.ValidationError('Colleges do not match.')
        college_exists = College.objects.filter(name=college1).exists()
        if college_exists:
            raise forms.ValidationError('College already exists.')

        return cleaned_data
