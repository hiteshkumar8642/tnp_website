# Generated by Django 4.2.13 on 2024-08-11 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0024_alter_announcement_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='job_description',
            field=models.FileField(upload_to='job_description/'),
        ),
    ]
