from django.core.management.base import BaseCommand, CommandError
from Django_API.models import Instructor, Discipline


class Command(BaseCommand):
    help = 'Loads dummy data for instructors'
    # TODO: Add classes to this

    instructors = [
        {'lastName': 'Smith', 'maxSections': 5, 'qualifications':
            ['C++ Programming', 'Data Structures and Algorithms']},
        {'lastName': 'Jones', 'maxSections': 7, 'qualifications': ['C++ Programming']},
        {'lastName': 'Roberts', 'maxSections': 3, 'qualifications': []}
    ]

    def handle(self, *args, **options):
        # Load disciplines
        disciplines = Discipline.objects.all()

        # Clear all existing instructors
        Instructor.objects.all().delete()

        for instructor in self.instructors:
            new_instructor = Instructor(lastName=instructor['lastName'], maxSections=instructor['maxSections'])
            new_instructor.save()
            for qual in instructor['qualifications']:
                new_instructor.qualifications.add(disciplines.get(name=qual))
            new_instructor.save()
