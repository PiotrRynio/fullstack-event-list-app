import { HUNDRED_YEARS_IN_MILLISECONDS } from 'constants/times';

export const isEventDataCorrect = (checkedDate: string) => {
  const currentDate = new Date(new Date().toLocaleDateString('en-CA'));
  const eventDate = new Date(checkedDate);

  const isEventDateCorrect =
    eventDate.getTime() >= currentDate.getTime() &&
    eventDate.getTime() < currentDate.getTime() + HUNDRED_YEARS_IN_MILLISECONDS;

  return isEventDateCorrect;
};
