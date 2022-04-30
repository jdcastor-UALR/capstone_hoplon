from datetime import datetime

from django.core.mail import send_mail
from more_itertools import pairwise

from Django_API.models import TimeSlot


def prettyTimeString(section_id):
    prettyString = ''
    for time_slot in TimeSlot.objects.filter(section=section_id):
        prettyString += ("{} {}-{} ").format(time_slot.meetingDays, time_slot.begin_time, time_slot.end_time)
    return prettyString


def do_timeslots_overlap(timeslots: list):
    """ Function to determine if arbitrary number of TimeSlots overlap """

    day_num = {'Sun.': 2, 'Mon.': 3, 'Tue.': 4, 'Wed.': 5, 'Thu.': 6, 'Fri.': 7, 'Sat.': 8}
    to_datetime = lambda ts: (datetime(2022, 1, day_num[ts['meetingDays']], int(ts['begin_time'][:2])),
                              datetime(2022, 1, day_num[ts['meetingDays']], int(ts['end_time'][:2])))
    time_ranges = sorted((to_datetime(ts) for ts in timeslots), key=lambda x: x[0])

    for ts1, ts2 in pairwise(time_ranges):
        if ts1[0] < ts2[1] and ts1[1] > ts2[0]:
            return True

    return False


def send_email(email, approved, password):
    message_body = "Your ADTAA Account Request was "
    if approved:
        message_body += "Approved "
    else:
        message_body += "Denied "
    message_body += "with the credentials: Email: " + email + " Password: " + password
    send_mail(
        subject='ADTAA Account Request',
        from_email=None,
        message=message_body,
        recipient_list=[email],
        fail_silently=False, )
