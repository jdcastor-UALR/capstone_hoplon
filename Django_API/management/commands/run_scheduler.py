import json
import time

from django.core.management import BaseCommand

from Django_API.recursive_scheduler import RecursiveScheduler
from Django_API.models import Section, Instructor
from Django_API.serializers import InstructorSerializer, SectionFullSerializer


class Command(BaseCommand):
    help = 'Runs recursive scheduler on initialized data and outputs execution time'

    def handle(self, *args, **options):
        section_data = json.loads(json.dumps(SectionFullSerializer(Section.objects.all(), many=True).data))
        instructor_data = json.loads(json.dumps(InstructorSerializer(Instructor.objects.all(), many=True).data))

        start_time = time.time()
        rs = RecursiveScheduler(section_data, instructor_data)
        print(f'SETUP - {(time.time() - start_time)} seconds')
        rs.run()
        print(f'ALGORITHM - {(time.time() - start_time)} seconds')
