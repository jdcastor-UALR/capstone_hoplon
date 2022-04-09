import json

from django.core.management import BaseCommand

from Django_API.genetic_scheduler import GeneticScheduler
from Django_API.models import Section, Instructor
from Django_API.serializers import InstructorSerializer, SectionFullSerializer


class Command(BaseCommand):
    help = 'Loads dummy data'

    def handle(self, *args, **options):
        section_data = json.loads(json.dumps(SectionFullSerializer(Section.objects.all(), many=True).data))
        instructor_data = json.loads(json.dumps(InstructorSerializer(Instructor.objects.all(), many=True).data))

        scheduler = GeneticScheduler(instructor_data, section_data)
