# Generated by Django 5.0.4 on 2025-04-29 10:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0013_remove_job_posted_at_job_poste_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='poste_date',
            new_name='post_date',
        ),
    ]
