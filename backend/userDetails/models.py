from django.db import models
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.html import strip_tags
from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token,*args, **kwargs):
    sitelink = "http://localhost:8000/"
    token = "?token={}".format(reset_password_token.key)
    full_link = str(sitelink) + str("password-reset") + str(token)

    print(full_link)
