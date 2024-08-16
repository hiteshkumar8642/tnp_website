from django.db import models
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.html import strip_tags
from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token,*args, **kwargs):
    sitelink = "http://localhost:3000/"
    token = "{}".format(reset_password_token.key)
    full_link = str(sitelink) + str("password-reset/") + str(token)

    print(full_link)

    context = {
        "full_link" : full_link ,
        "email_address" : reset_password_token.user.email
    }
    html_message = render_to_string("userDetails/forgetPasswordEmail.html",context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject = "Request for resetting password for{title}".format(title = reset_password_token.user.email),
        body = plain_message,
        to = [reset_password_token.user.email]
    )
    msg.attach_alternative(html_message,"text/html")
    msg.send()

