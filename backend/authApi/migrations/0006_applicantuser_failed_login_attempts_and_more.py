# Generated by Django 5.2.1 on 2025-07-03 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApi', '0005_applicantuser_birthdate_applicantuser_gender_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicantuser',
            name='failed_login_attempts',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='applicantuser',
            name='locked_until',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
