from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class College(models.Model):
    name = models.CharField(max_length=100)
    subdomain = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='college')

    def __str__(self):
        return self.name


# Company_Contact DataBase  
    
class Company_contacts(models.Model):
    company_name = models.CharField(max_length=50)
    company_email = models.CharField(max_length=90)
    company_contact = models.CharField(max_length=20,default="")
    ctc = models.CharField(max_length=15)
    college_visited = models.CharField(max_length=50)
    type = models.CharField(max_length=100)
    is_company = models.CharField(max_length=10)
    location = models.CharField(max_length=30)

    def __str__(self):
        return self.company_name
    

# HR_Contact DataBase 
    
class HR_contact(models.Model):
    name = models.CharField(max_length=30)
    company_name = models.CharField(max_length=50)
    email =  models.CharField(max_length=50)
    contact_number = models.CharField(max_length=20)
    linkedin_id = models.CharField(max_length=70)

    def __str__(self):
        return self.name