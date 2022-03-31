from django.contrib.auth.models import AbstractUser
from django.db import models

from Django_API.model_enums import AccessLevelChoices


class User(AbstractUser):
    accessLevel = models.CharField(max_length=255, choices=AccessLevelChoices.choices)


class RegistrationRequest(models.Model):
    access_level = models.CharField(
        max_length=9,
        choices=AccessLevelChoices.choices,
        blank=False
    )

    requested_user_name = models.CharField(max_length=30, blank=False, default='')
    requested_password = models.CharField(max_length=30, blank=False, default='')
    contact_email = models.EmailField(max_length=30, blank=False, default='')


class Session(models.Model):
    associated_user = models.ForeignKey(User, on_delete=models.CASCADE)


class TimeSlot(models.Model):
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()


class Discipline(models.Model):
    name = models.CharField(max_length=255)


class Course(models.Model):
    course_title = models.CharField(max_length=30, blank=False, default='')
    course_number = models.CharField(max_length=4, blank=False, default='')
    subject_disciplines = models.ManyToManyField(Discipline, blank=True)


class Section(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    meetingTimes = models.ManyToManyField(TimeSlot)


class Instructor(models.Model):
    lastName = models.CharField(max_length=30)
    maxSections = models.IntegerField(default='1')
    qualifications = models.ManyToManyField(Discipline, blank=True)

