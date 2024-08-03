from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from dashboard.models import College,Course

class createUserForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Enter a valid email address.')
    college = forms.CharField(max_length=254, required=True)
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

    subdomain = forms.CharField(max_length=100, required=False)
    branches = forms.MultipleChoiceField(
        label="Select branches",
        widget=forms.SelectMultiple,
        required=True
    )
    
    class Meta:
        model = User
        fields = ['college1','college2', 'subdomain', 'branches', 'first_name', 'last_name', 'username', 'email', 'password1','password2']

    def __init__(self, *args, **kwargs):
        super(CollegeRegistrationForm, self).__init__(*args, **kwargs)
        self.fields['branches'].choices = [(course.id, course.degree) for course in Course.objects.all()]

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
