# Generated by Django 5.0.2 on 2024-03-02 08:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_application_course_remove_college_user_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='appliedcompany',
            name='is_selected',
            field=models.CharField(choices=[('applied', 'Applied'), ('rejected', 'Rejected'), ('selected', 'Selected')], default='applied', max_length=10),
        ),
        migrations.CreateModel(
            name='Shared_Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=50)),
                ('company_email', models.CharField(max_length=90)),
                ('company_contact', models.CharField(default='', max_length=20)),
                ('ctc', models.CharField(max_length=15)),
                ('college_visited', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=100)),
                ('is_company', models.CharField(max_length=10)),
                ('location', models.CharField(max_length=30)),
                ('college_branch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.collegecourse')),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Shared_HR_contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('company_name', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('contact_number', models.CharField(max_length=20)),
                ('linkedin_id', models.CharField(max_length=70)),
                ('college_branch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.collegecourse')),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
