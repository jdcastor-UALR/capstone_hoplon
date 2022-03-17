from django.db import models

from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles


class AccessLevelChoices(models.AccessLevelChoices):
    ROOT = 1, "Root"
    ADMIN = 2, "Admin"
    ASSISTANT = 3, "Assistant"
    PUBLIC = 4, "Public"


class DisciplineChoices(models.DisciplineChoices):
    Programming_CPP = 1, "C++",
    Programming_Python = 2, "Python",
    Game_Development = 3, "Game Dev",
    Data_Structures_And_Algorithms = 4, "DS&Algorithms",
    Computer_Organization = 5, "Computer Org",
    Operating_Systems = 6, "OS",
    Programming_Languages = 7, "Programming Languages",
    Cybersecurity = 8, "CyberSecurity",
    Mobile_Applications = 9, "Mobile Apps",
    Artificial_Intelligence = 10, "AI",
    Networks = 11, "Networks",
    Theory_Of_Computation = 12, "Theory of Computation",
    Parallel_And_Distributed_Systems = 13, "Distributed Systems",
    Virtual_Reality = 14, "VR"
