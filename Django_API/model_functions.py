from Django_API.models import Section, Course, Instructor


def get_section_instructor_discipline_map():
    result = {}
    course_instructor_map = {}

    for course in Course.objects.all():
        valid_instructors = Instructor.objects.filter(qualifications__course=course)
        course_instructor_map[course.id] = list(set(valid_instructors.values_list('id', flat=True)))

    for section in Section.objects.all():
        result[section.id] = course_instructor_map[section.course.id]

    return result
