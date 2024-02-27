from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class College(models.Model):
    name = models.CharField(max_length=100)
    subdomain = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='college')

    def __str__(self):
        return self.name