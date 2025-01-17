# Generated by Django 5.0.3 on 2024-05-16 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='criminalModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('date_of_birth', models.DateField()),
                ('gender', models.CharField(max_length=50)),
                ('offense_description', models.TextField()),
                ('victim_name', models.CharField(max_length=500)),
                ('case_status', models.CharField(max_length=50)),
                ('case_number', models.CharField(max_length=500)),
                ('arresting_officer', models.CharField(max_length=500)),
                ('release_date', models.DateField()),
            ],
        ),
    ]
