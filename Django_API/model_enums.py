from django.db import models
from django.utils.translation import gettext_lazy as _


class AccessLevelChoices(models.TextChoices):
    ROOT = 'root', _('Root')
    ADMIN = 'admin', _('Admin')
    ASSISTANT = 'assistant', _('Assistant')
    PUBLIC = 'public', _('Public')


class SectionDayChoices(models.TextChoices):
    Sunday = 'sunday', _('Sunday')
    Monday = 'monday', _('Monday')
    Tuesday = 'tuesday', _('Tuesday')
    Wednesday = 'wednesday', _('Wednesday')
    Thursday = 'thursday', _('Thursday')
    Friday = 'friday', _('Friday')
    Saturday = 'saturday', _('Saturday')
