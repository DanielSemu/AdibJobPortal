# Generated by Django 5.2.1 on 2025-06-11 06:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0005_education_remove_applicant_cgpa_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='education',
            name='applicant',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='educations', to='applications.applicant'),
            preserve_default=False,
        ),
    ]
