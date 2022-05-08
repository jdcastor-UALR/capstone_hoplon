export const DayAbbrevToValue = {
  'Mon.': 'Monday', 'Tue.': 'Tuesday', 'Wed.': 'Wednesday', 'Thu.': 'Thursday',
  'Fri.': 'Friday', 'Sat.': 'Saturday', 'Sun.': 'Sunday'
};

export const LoginFormMessages = {
  registerSuccess:
    'Successfully submitted registration request. You will receive an email when your request has been processed.',
  wrongCredentials:
    'Wrong email or password, please try again.',
  invalidRegistration: 'Could not process request. Please ensure email address is valid and password is not blank.'
};

export const timeslotToString = (timeslot) => {
  if (timeslot.begin_time.length > 5) timeslot.begin_time = timeslot.begin_time.slice(0, -3);
  if (timeslot.end_time.length > 5) timeslot.end_time = timeslot.end_time.slice(0, -3);
  return `${timeslot.meetingDays} ${timeslot.begin_time}-${timeslot.end_time}`;
};

export const convertTimeToNumber = (time) => {
  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1] / 60);
  return hours + minutes;
}

export const pairwise = (arr, func) => {
  for (let i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1]);
  }
};
