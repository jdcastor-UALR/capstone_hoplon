from django.core.management.base import BaseCommand, CommandError
from Django_API.models import Discipline


class Command(BaseCommand):
    help = 'Loads dummy data for disciplines model'

    disciplines = [
        {'name': 'Programming-C++'},
        {'name': 'Programming-Python'},
        {'name': 'Software Engineering'},
        {'name': 'Software Development Methodologies'},
        {'name': 'Game Development'},
        {'name': 'Data Structures and Algorithms'},
        {'name': 'Computer Organization'},
        {'name': 'Operating Systems'},
        {'name': 'Programming Languages'},
        {'name': 'Cybersecurity'},
        {'name': 'Mobile Applications'},
        {'name': 'Artificial Intelligence'},
        {'name': 'Networks'},
        {'name': 'Theory of Computation'},
        {'name': 'Parallel and Distributed Systems'},
        {'name': 'Virtual Reality'},
        {'name': 'Hardware Designs'},
        {'name': 'Data Structures'}
    ]

    def handle(self, *args, **options):
        # Clear all existing disciplines
        Discipline.objects.all().delete()

        new_disciplines = []
        for discipline in self.disciplines:
            new_discipline = Discipline(name=discipline['name'])
            new_disciplines.append(new_discipline)
        Discipline.objects.bulk_create(new_disciplines)
