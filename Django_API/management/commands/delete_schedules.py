from django.core.management import BaseCommand

from Django_API.models import AssignedSection, Solution


class Command(BaseCommand):
    help = 'Deletes all AssignedSection and Solution models'

    def handle(self, *args, **options):
        AssignedSection.objects.all().delete()
        Solution.objects.all().delete()
