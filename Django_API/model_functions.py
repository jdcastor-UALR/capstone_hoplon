from Django_API.models import Section, Course, Instructor, ChangeRecord
from Django_API.utility import do_timeslots_overlap


def get_section_instructor_discipline_map():
    result = {}
    course_instructor_map = {}

    for course in Course.objects.all():
        valid_instructors = Instructor.objects.filter(qualifications__course=course)
        course_instructor_map[course.id] = list(set(valid_instructors.values_list('id', flat=True)))

    for section in Section.objects.all():
        result[section.id] = course_instructor_map[section.course.id]

    return result


def get_section_overlap_map(section_data):
    result = {}

    for section in section_data:
        result[section['id']] = []
        section_timeslots = [ts for ts in section['meetingTimes']]
        for other_section in section_data:
            both_section_timeslots = section_timeslots + [ts for ts in other_section['meetingTimes']]
            if do_timeslots_overlap(both_section_timeslots):
                result[section['id']].append(other_section['id'])

    return result


def add_change_record(is_scheduler_run):
    record = ChangeRecord(scheduler=is_scheduler_run)
    record.save()


def data_changed():
    record = ChangeRecord.objects.order_by('timestamp').last()
    return not record.scheduler if record else True
