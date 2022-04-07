from django.core.management.base import BaseCommand, CommandError
from Django_API.models import Instructor, Discipline, Section, Course, TimeSlot


class Command(BaseCommand):
    help = 'Loads dummy data'
    # TODO: Add classes to this

    instructors = [
        {'lastName': 'Baker', 'maxSections': 2, 'qualifications':
            ['Programming-C++', 'Software Engineering', 'Software Development Methodologies']},
        {'lastName': 'Pierce', 'maxSections': 3, 'qualifications':
            ['Programming-Python', 'Computer Organization', 'Networks', 'Operating Systems']},
        {'lastName': 'Conde', 'maxSections': 4, 'qualifications':
            ['Game Development', 'Data Structures and Algorithms', 'Mobile Applications']},
        {'lastName': 'Chiang', 'maxSections': 3, 'qualifications':
            ['Artificial Intelligence', 'Theory of Computation']},
        {'lastName': 'Orme', 'maxSections': 4, 'qualifications':
            ['Parallel and Distributed Systems', 'Mobile Applications', 'Cybersecurity']},
        {'lastName': 'Bolt', 'maxSections': 3, 'qualifications':
            ['Virtual Reality', 'Cybersecurity', 'Parallel and Distributed Systems']},
        {'lastName': 'Springer', 'maxSections': 4, 'qualifications':
            ['Programming Languages', 'Data Structures and Algorithms']},
        {'lastName': 'Zak', 'maxSections': 3, 'qualifications':
            ['Mobile Applications', 'Game Development', 'Virtual Reality']},
        {'lastName': 'Milanova', 'maxSections': 4, 'qualifications':
            ['Programming-C++', 'Programming-Python', 'Data Structures and Algorithms', 'Artificial Intelligence']},
    ]

    courses = [
        {'course_title': 'Capstone Project', 'course_number': '4392', 'subject_disciplines':
            ['Software Engineering', 'Software Development Methodologies']},
        {'course_title': 'Computer Security', 'course_number': '4360', 'subject_disciplines':
            ['Software Engineering', 'Cybersecurity']},
        {'course_title': 'Distributed Computing', 'course_number': '4387', 'subject_disciplines':
            ['Programming Languages', 'Parallel and Distributed Systems']},
        {'course_title': 'Principle of UI & UX', 'course_number': '4379', 'subject_disciplines':
            ['Mobile Applications', 'Game Development']},
        {'course_title': 'Theory of Computers', 'course_number': '4370', 'subject_disciplines':
            ['Theory of Computation']},
        {'course_title': 'Special Topics', 'course_number': '4399', 'subject_disciplines':
            ['Networks', 'Operating Systems']},
        {'course_title': 'Interactive Computer and Graphics & Animations', 'course_number': '4366', 'subject_disciplines':
            ['Artificial Intelligence', 'Game Development']},
        {'course_title': '3D Modeling for Game Designs', 'course_number': '4368', 'subject_disciplines':
            ['Game Development', 'Virtual Reality']},
        {'course_title': 'Software Engineering', 'course_number': '4373', 'subject_disciplines':
            ['Programming-C++', 'Programming-Python']},
        {'course_title': 'Web Stack Client Side Technology', 'course_number': '4380', 'subject_disciplines':
            ['Programming Languages', 'Data Structures and Algorithms']},
        {'course_title': 'Independent Study', 'course_number': '4500', 'subject_disciplines':
            ['Operating Systems', 'Mobile Applications']},
        {'course_title': 'Advanced Game Programming', 'course_number': '3377', 'subject_disciplines':
            ['Programming-C++', 'Programming-Python', 'Data Structures and Algorithms']},
        {'course_title': 'Operating Systems', 'course_number': '3380', 'subject_disciplines':
            ['Hardware Designs', 'Data Structures']},
        {'course_title': 'RPG Programming', 'course_number': '3382', 'subject_disciplines':
            ['Programming Languages']},
        {'course_title': 'Computer Networks', 'course_number': '3384', 'subject_disciplines':
            ['Networks', 'Computer Organization']},
        {'course_title': 'Programming II', 'course_number': '2376', 'subject_disciplines':
            ['Software Engineering', 'Software Development Methodologies']},
        {'course_title': 'Introduction to Game Programming', 'course_number': '2377', 'subject_disciplines':
            ['Artificial Intelligence', 'Game Development', 'Mobile Applications']},
        {'course_title': 'Algorithm', 'course_number': '2380', 'subject_disciplines':
            ['Networks', 'Programming Languages']},
        {'course_title': 'Programming I', 'course_number': '1375', 'subject_disciplines':
            ['Programming Languages', 'Mobile Applications']},
        {'course_title': 'Mobile Application Development', 'course_number': '3367', 'subject_disciplines':
            ['Mobile Applications', 'Programming Languages', 'Software Engineering']},
    ]

    sections = [
            {'courseTitle': 'Capstone Project', 'meetingTimes':
                [
                    {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'Tue.'},
                    {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'Thu.'}
                ]
             },
            {'courseTitle': 'Capstone Project', 'meetingTimes':
                [
                    {'begin_time': '13:35', 'end_time': '14:25', 'meetingDays': 'Mon.'},
                    {'begin_time': '13:35', 'end_time': '14:25', 'meetingDays': 'Wed.'},
                    {'begin_time': '10:15', 'end_time': '11:25', 'meetingDays': 'Fri.'},
                ]
             },
            {'courseTitle': 'Computer Security', 'meetingTimes':
                [
                    {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'Mon.'},
                    {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'Wed.'},
                    {'begin_time': '10:25', 'end_time': '11:25', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Computer Security', 'meetingTimes':
                [
                    {'begin_time': '14:25', 'end_time': '15:40', 'meetingDays': 'Tue.'},
                ]
             },
            {'courseTitle': 'Distributed Computing', 'meetingTimes':
                [
                    {'begin_time': '10:25', 'end_time': '11:40', 'meetingDays': 'Mon.'},
                    {'begin_time': '10:25', 'end_time': '11:40', 'meetingDays': 'Tue.'},
                ]
             },
            {'courseTitle': 'Principle of UI & UX', 'meetingTimes':
                [
                    {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'Tue.'},
                    {'begin_time': '9:25', 'end_time': '10:40', 'meetingDays': 'Thu.'},
                ]
             },
            {'courseTitle': 'Principle of UI & UX', 'meetingTimes':
                [
                    {'begin_time': '13:35', 'end_time': '14:45', 'meetingDays': 'Mon.'},
                    {'begin_time': '13:35', 'end_time': '14:45', 'meetingDays': 'Wed.'}
                ]
             },
            {'courseTitle': 'Theory of Computers', 'meetingTimes':
                [
                    {'begin_time': '12:25', 'end_time': '13:40', 'meetingDays': 'Mon.'},
                    {'begin_time': '12:25', 'end_time': '13:40', 'meetingDays': 'Wed.'},
                    {'begin_time': '14:30', 'end_time': '15:30', 'meetingDays': 'Fri.'},
                ]
             },
            {'courseTitle': 'Special Topics', 'meetingTimes':
                [
                    {'begin_time': '8:25', 'end_time': '9:40', 'meetingDays': 'Mon.'},
                    {'begin_time': '8:25', 'end_time': '9:40', 'meetingDays': 'Tue.'},
                    {'begin_time': '10:25', 'end_time': '11:40', 'meetingDays': 'Wed.'}
                ]
             },
            {'courseTitle': 'Special Topics', 'meetingTimes':
                [
                    {'begin_time': '11:25', 'end_time': '12:40', 'meetingDays': 'Thu.'}
                ]
             },
            {'courseTitle': 'Interactive Computer and Graphics & Animations', 'meetingTimes':
                [
                    {'begin_time': '8:25', 'end_time': '9:40', 'meetingDays': 'Tue.'},
                    {'begin_time': '8:25', 'end_time': '9:40', 'meetingDays': 'Wed.'},
                    {'begin_time': '13:35', 'end_time': '14:25', 'meetingDays': 'Thur.'}

                ]
             },
            {'courseTitle': 'Interactive Computer and Graphics & Animations', 'meetingTimes':
                [
                    {'begin_time': '12:25', 'end_time': '13:40', 'meetingDays': 'Fri.'},
                    {'begin_time': '8:25', 'end_time': '9:40', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': '3D Modeling for Game Designs', 'meetingTimes':
                [
                    {'begin_time': '10:25', 'end_time': '11:40', 'meetingDays': 'Mon.'},
                    {'begin_time': '10:25', 'end_time': '11:40', 'meetingDays': 'Thu.'}
                ]
             },
            {'courseTitle': '3D Modeling for Game Designs', 'meetingTimes':
                [
                    {'begin_time': '11:15', 'end_time': '12:50', 'meetingDays': 'Sun.'},
                    {'begin_time': '11:15', 'end_time': '12:50', 'meetingDays': 'Wed.'}
                ]
             },
            {'courseTitle': 'Software Engineering', 'meetingTimes':
                [
                    {'begin_time': '13:00', 'end_time': '14:10', 'meetingDays': 'Tue.'},
                    {'begin_time': '13:00', 'end_time': '14:10', 'meetingDays': 'Wed.'},
                    {'begin_time': '8:15', 'end_time': '9:20', 'meetingDays': 'Thu.'}

                ]
             },
            {'courseTitle': 'Software Engineering', 'meetingTimes':
                [
                    {'begin_time': '15:15', 'end_time': '16:20', 'meetingDays': 'Thu.'},
                    {'begin_time': '15:15', 'end_time': '16:20', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Web Stack Client Side Technology', 'meetingTimes':
                [
                    {'begin_time': '11:25', 'end_time': '12:30', 'meetingDays': 'Mon.'},
                    {'begin_time': '16:05', 'end_time': '17:10', 'meetingDays': 'Tue.'}
                ]
             },
            {'courseTitle': 'Web Stack Client Side Technology', 'meetingTimes':
                [
                    {'begin_time': '12:25', 'end_time': '13:40', 'meetingDays': 'Thu.'}
                ]
             },
            {'courseTitle': 'Independent Study', 'meetingTimes':
                [
                    {'begin_time': '14:40', 'end_time': '15:25', 'meetingDays': 'Mon.'},
                    {'begin_time': '10:20', 'end_time': '11:35', 'meetingDays': 'Wed.'}
                ]
             },
            {'courseTitle': 'Advanced Game Programming', 'meetingTimes':
                [
                    {'begin_time': '12:00', 'end_time': '12:50', 'meetingDays': 'Tue.'},
                    {'begin_time': '12:00', 'end_time': '12:50', 'meetingDays': 'Thu.'},
                    {'begin_time': '11:30', 'end_time': '12:20', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Advanced Game Programming', 'meetingTimes':
                [
                    {'begin_time': '15:55', 'end_time': '16:45', 'meetingDays': 'Mon.'}
                ]
             },
            {'courseTitle': 'Operating Systems', 'meetingTimes':
                [
                    {'begin_time': '16:05', 'end_time': '16:40', 'meetingDays': 'Tue.'},
                    {'begin_time': '16:05', 'end_time': '16:40', 'meetingDays': 'Fri.'},
                    {'begin_time': '16:05', 'end_time': '17:00', 'meetingDays': 'Thu.'}
                ]
             },
            {'courseTitle': 'RPG Programming', 'meetingTimes':
                [
                    {'begin_time': '15:35', 'end_time': '16:25', 'meetingDays': 'Wed.'},
                    {'begin_time': '15:35', 'end_time': '16:25', 'meetingDays': 'Thu.'},
                    {'begin_time': '13:50', 'end_time': '14:30', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Computer Networks', 'meetingTimes':
                [
                    {'begin_time': '16:50', 'end_time': '17:30', 'meetingDays': 'Wed.'},
                    {'begin_time': '16:50', 'end_time': '17:30', 'meetingDays': 'Thu.'},
                    {'begin_time': '16:20', 'end_time': '17:00', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Programming II', 'meetingTimes':
                [
                    {'begin_time': '16:55', 'end_time': '17:40', 'meetingDays': 'Mon.'},
                    {'begin_time': '17:40', 'end_time': '18:25', 'meetingDays': 'Wed.'},
                    {'begin_time': '17:05', 'end_time': '17:40', 'meetingDays': 'Thu.'}
                ]
             },
            {'courseTitle': 'Introduction to Game Programming', 'meetingTimes':
                [
                    {'begin_time': '14:20', 'end_time': '15:00', 'meetingDays': 'Tue.'},
                    {'begin_time': '18:30', 'end_time': '19:10', 'meetingDays': 'Thu.'},
                    {'begin_time': '17:50', 'end_time': '18:30', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Algorithm', 'meetingTimes':
                [
                    {'begin_time': '18:40', 'end_time': '19:25', 'meetingDays': 'Thu.'},
                    {'begin_time': '18:40', 'end_time': '19:25', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Programming I', 'meetingTimes':
                [
                    {'begin_time': '17:05', 'end_time': '17:55', 'meetingDays': 'Mon.'},
                    {'begin_time': '18:35', 'end_time': '19:15', 'meetingDays': 'Wed.'},
                    {'begin_time': '17:50', 'end_time': '18:30', 'meetingDays': 'Fri.'}
                ]
             },
            {'courseTitle': 'Mobile Application Development', 'meetingTimes':
                [
                    {'begin_time': '19:25', 'end_time': '20:10', 'meetingDays': 'Tue.'},
                    {'begin_time': '19:25', 'end_time': '20:10', 'meetingDays': 'Wed.'},
                    {'begin_time': '19:15', 'end_time': '19:55', 'meetingDays': 'Thu.'}
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
