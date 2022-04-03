from Django_API.models import TimeSlot


def prettyTimeString(section_id):
    prettyString = ''
    for time_slot in TimeSlot.objects.filter(section=section_id):
        prettyString += ("{} {}-{}").format(time_slot.meetingDays, time_slot.begin_time, time_slot.end_time)
    return prettyString
