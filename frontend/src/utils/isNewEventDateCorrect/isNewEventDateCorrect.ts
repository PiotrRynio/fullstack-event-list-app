import { HUNDRED_YEARS_IN_MILLISECONDS } from 'constants/times';
import { dateWithoutClockTime } from 'utils/dateWithoutClockTime/dateWithoutClockTime';

export const isNewEventDateCorrect = (checkedDate: Date) => {
  const currentDate = dateWithoutClockTime();
  const eventDate = new Date(checkedDate);

  const isEventDateCorrect =
    eventDate.getTime() >= currentDate.getTime() &&
    eventDate.getTime() < currentDate.getTime() + HUNDRED_YEARS_IN_MILLISECONDS;

  return isEventDateCorrect;
};
