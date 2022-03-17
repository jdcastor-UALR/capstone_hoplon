from django.contrib.auth.models import AbstractUser
from django.db import models

from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

from Django_API import model_enums

# Create your models here.
from Django_API.model_enums import AccessLevelChoices

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class User(AbstractUser):
    accessLevel = models.CharField(max_length=255, choices=model_enums.AccessLevelChoices)


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
    # Id = Session ID, which is automatically generated
    associated_user = models.ForeignKey(User, on_delete=models.CASCADE)


class TimeSlot(models.Model):
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()


class Course(models.Model):
    course_title = models.CharField(max_length=30, blank=False, default='')
    course_number = models.CharField(max_length=4, blank=False, default='')
    subject_disciplines = models.CharField(choices=model_enums.DisciplineChoices, max_length=255, blank=True, null=True)


class Section(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    meetingTimes = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)


class Instructor(models.Model):
    lastName = models.CharField(max_length=30)
    maxSections = models.IntegerField(max_length=2, default='1')
    qualifications = models.CharField(choices=model_enums.DisciplineChoices, max_length=255, blank=True, null=True)


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)


    class Meta:
        ordering = ['created']
