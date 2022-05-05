from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.hashers import check_password

from Django_API.model_enums import AccessLevelChoices, SectionDayChoices


class PasswordChange:
    username = ""
    password = ""
    new_password = ""

    def __init__(self, username, password, new_password):
        self.username = username
        self.password = password
        self.new_password = new_password


class DBInitStatus(models.Model):
    root_initialized = models.BooleanField(default=False)


class User(AbstractUser):
    accessLevel = models.CharField(max_length=255, choices=AccessLevelChoices.choices)

    def change_password(self, password, new_password):
        if check_password(password, self.password):
            self.set_password(new_password)
            self.is_active = True
            self.save()
            return True
        return False


class RegistrationRequest(models.Model):
    access_level = models.CharField(
        max_length=9,
        choices=AccessLevelChoices.choices,
        blank=False
    )
    requested_password = models.CharField(max_length=30, blank=False, default='')
    contact_email = models.EmailField(max_length=30, blank=False, default='')


class TimeSlot(models.Model):
    begin_time = models.TimeField()
    end_time = models.TimeField()
    meetingDays = models.CharField(max_length=10, blank=False, choices=SectionDayChoices.choices, default='sunday')


class Discipline(models.Model):
    name = models.CharField(max_length=255, unique=True)


class Course(models.Model):
    course_title = models.CharField(max_length=55, blank=False, default='')
    course_number = models.CharField(max_length=4, blank=False, default='')
    subject_disciplines = models.ManyToManyField(Discipline, blank=True)


class Section(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    meetingTimes = models.ManyToManyField(TimeSlot)


class Instructor(models.Model):
    lastName = models.CharField(max_length=30)
    maxSections = models.IntegerField(default='1')
    qualifications = models.ManyToManyField(Discipline, blank=True)


class Solution(models.Model):
    assignment_count = models.IntegerField(default=0)


class AssignedSection(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, blank=True, null=True, on_delete=models.SET_NULL)


class ChangeRecord(models.Model):
    scheduler = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
