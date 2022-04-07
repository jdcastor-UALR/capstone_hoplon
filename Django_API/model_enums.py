from django.db import models
from django.utils.translation import gettext_lazy as _


class AccessLevelChoices(models.TextChoices):
    ROOT = 'root', _('Root')
    ADMIN = 'admin', _('Admin')
    ASSISTANT = 'assistant', _('Assistant')
    PUBLIC = 'public', _('Public')


class SectionDayChoices(models.TextChoices):
    Sunday = 'Sun.', _('Sunday')
    Monday = 'Mon.', _('Monday')
    Tuesday = 'Tue.', _('Tuesday')
    Wednesday = 'Wed.', _('Wednesday')
    Thursday = 'Thu.', _('Thursday')
    Friday = 'Fri.', _('Friday')
    Saturday = 'Sat.', _('Saturday')
