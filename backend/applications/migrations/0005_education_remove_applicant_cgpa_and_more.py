# Generated by Django 5.2.1 on 2025-06-11 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0004_applicant_selectedcriteria_alter_applicant_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('education_level', models.CharField(max_length=100)),
                ('field_of_study', models.CharField(max_length=100)),
                ('education_organization', models.CharField(max_length=255)),
                ('graduation_year', models.DateField()),
                ('cgpa', models.DecimalField(decimal_places=2, max_digits=4)),
                ('exit_exam', models.DecimalField(decimal_places=2, max_digits=4)),
                ('user_for_application', models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='cgpa',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='education_level',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='education_organization',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='exit_exam',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='field_of_study',
        ),
        migrations.RemoveField(
            model_name='applicant',
            name='graduation_year',
        ),
    ]
