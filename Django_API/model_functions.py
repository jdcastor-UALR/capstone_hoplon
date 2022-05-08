from Django_API.models import Section, Course, Instructor, ChangeRecord
from Django_API.utility import do_timeslots_overlap


def get_section_instructor_discipline_map():
    """
    Function to create a map between section IDs and IDs of instructors who meet discipline constraint
    :return: A dict with section ID keys and list of instructor ID values
    """
    result = {}
    course_instructor_map = {}

    for course in Course.objects.all():
        valid_instructors = Instructor.objects.filter(qualifications__course=course)
        course_instructor_map[course.id] = list(set(valid_instructors.values_list('id', flat=True)))

    for section in Section.objects.all():
        result[section.id] = course_instructor_map[section.course.id]

    return result


def get_section_overlap_map(section_data):
    """
    Function to create a map between section IDs and section IDs that overlap that section
    :param section_data: Serialized data from section model
    :return: A dict with section ID keys and list of section ID values
    """
    result = {}

    for section in section_data:
        result[section['id']] = []
        section_timeslots = [ts for ts in section['meetingTimes']]
        for other_section in section_data:
            both_section_timeslots = section_timeslots + [ts for ts in other_section['meetingTimes']]
            if do_timeslots_overlap(both_section_timeslots) and section['id'] != other_section['id']:
                result[section['id']].append(other_section['id'])

    return result


def add_change_record(is_scheduler_run):
    """
    Function to record a change being made to the data used to generate schedules
    :param is_scheduler_run: Boolean value representing if the record a scheduler run or not
    :return: None
    """
    record = ChangeRecord(scheduler=is_scheduler_run)
    record.save()


def data_changed():
    """
    Function to get whether the data has changed since the last scheduler run or not
    :return: Boolean representing whether the data has changed or not
    """
    record = ChangeRecord.objects.order_by('timestamp').last()
    return not record.scheduler if record else True
