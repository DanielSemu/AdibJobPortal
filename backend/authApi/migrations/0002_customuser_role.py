# Generated by Django 5.0.4 on 2025-04-25 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('hr_maker', 'HR Maker'), ('hr_checker', 'HR Checker'), ('user', 'User')], default='user', max_length=20),
        ),
    ]
