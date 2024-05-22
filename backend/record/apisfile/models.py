from django.db import models
import datetime

class criminalModel(models.Model):
  name = models.CharField(max_length=500)
  date_of_birth = models.DateField()
  gender = models.CharField(max_length=50)
  offense_description = models.TextField()
  victim_name = models.CharField(max_length=500)
  case_status = models.CharField(max_length=50)
  case_number = models.CharField(max_length=500)
  arresting_officer = models.CharField(max_length=500)
  release_date = models.DateField()
