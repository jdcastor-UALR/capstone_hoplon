export const DayAbbrevToValue = {
  'Mon.': 'Monday', 'Tue.': 'Tuesday', 'Wed.': 'Wednesday', 'Thu.': 'Thursday',
  'Fri.': 'Friday', 'Sat.': 'Saturday', 'Sun.': 'Sunday'
};

export const timeslotToString = (timeslot) => {
  return `${timeslot.meetingDays} ${timeslot.begin_time.slice(0, -3)}-${timeslot.end_time.slice(0, -3)}`;
};
