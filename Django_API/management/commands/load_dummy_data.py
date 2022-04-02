from django.core.management.base import BaseCommand, CommandError
from Django_API.models import Instructor, Discipline, Section, Course, TimeSlot


class Command(BaseCommand):
    help = 'Loads dummy data'
    # TODO: Add classes to this

    instructors = [
        {'lastName': 'Smith', 'maxSections': 5, 'qualifications':
            ['C++ Programming', 'Data Structures and Algorithms']},
        {'lastName': 'Jones', 'maxSections': 7, 'qualifications': ['C++ Programming']},
        {'lastName': 'Roberts', 'maxSections': 3, 'qualifications': []}
    ]

    courses = [
        {'course_title': 'AI', 'course_number': '4383', 'subject_disciplines':
            ['Python Programming', 'Artificial Intelligence']},
        {'course_title': 'Capstone Project', 'course_number': '4392', 'subject_disciplines':
            ['Python Programming', 'Artificial Intelligence']},
        {'course_title': 'Software Engineering', 'course_number': '4301', 'subject_disciplines':
            ['Python Programming', 'Artificial Intelligence']}
    ]

    sections = [
        {'courseTitle': 'AI', 'meetingTimes':
            [
                {'begin_time': '10:10', 'end_time': '11:00', 'meetingDays': 'sunday'},
                {'begin_time': '10:10', 'end_time': '11:00', 'meetingDays': 'wednesday'},
                {'begin_time': '13:00', 'end_time': '13:50', 'meetingDays': 'friday'}
            ]
         },
        {'courseTitle': 'Capstone Project', 'meetingTimes':
            [
                {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'tuesday'},
                {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'thursday'}
            ]
         },
        {'courseTitle': 'Capstone Project', 'meetingTimes':
            [
                {'begin_time': '16:25', 'end_time': '17:40', 'meetingDays': 'monday'},
                {'begin_time': '16:25', 'end_time': '17:40', 'meetingDays': 'wednesday'}
            ]
         },
        {'courseTitle': 'Software Engineering', 'meetingTimes':
            [
                {'begin_time': '16:25', 'end_time': '17:40', 'meetingDays': 'wednesday'},
                {'begin_time': '16:25', 'end_time': '17:40', 'meetingDays': 'friday'}
            ]
         }
    ]

    def handle(self, *args, **options):
        # Load disciplines
        disciplines = Discipline.objects.all()

        # Clear All Existing Data
        Instructor.objects.all().delete()
        Course.objects.all().delete()
        Section.objects.all().delete()
        TimeSlot.objects.all().delete()

        # Loop For Instructors
        for instructor in self.instructors:
            new_instructor = Instructor(lastName=instructor['lastName'], maxSections=instructor['maxSections'])
            new_instructor.save()
            for qual in instructor['qualifications']:
                new_instructor.qualifications.add(disciplines.get(name=qual))
            new_instructor.save()

        # Loop for Course
        for course in self.courses:
            new_course = Course(course_title=course['course_title'], course_number=course['course_number'])
            new_course.save()

            for discipline in course['subject_disciplines']:
                new_course.subject_disciplines.add(disciplines.get(name=discipline))

        # Loop for Section
        for section in self.sections:
            new_section = Section(course=Course.objects.get(course_title=section['courseTitle']))
            new_section.save()
            for time in section['meetingTimes']:
                new_time = TimeSlot(begin_time=time['begin_time'], end_time=time['end_time'],
                                    meetingDays=time['meetingDays'])
                new_time.save()
                new_section.meetingTimes.add(new_time)
