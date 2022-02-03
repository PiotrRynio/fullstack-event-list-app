import { HUNDRED_YEARS_IN_MILLISECONDS } from 'constants/times';
import { isNewEventDateCorrect } from './isNewEventDateCorrect';

describe('isNewEventDateCorrect', () => {
  it('should return true, if date is from now to a hundred years ahead', () => {
    // given
    const checkedData = new Date(new Date().getTime() + HUNDRED_YEARS_IN_MILLISECONDS / 2);

    // when
    const isCorrect = isNewEventDateCorrect(checkedData);

    // then
    expect(isCorrect).toBeTruthy();
  });
  it('should return false, if date is before today', () => {
    // given
    const checkedData = new Date(new Date().getTime() - HUNDRED_YEARS_IN_MILLISECONDS);

    // when
    const isCorrect = isNewEventDateCorrect(checkedData);

    // then
    expect(isCorrect).toBeFalsy();
  });

  it('should return false, if date is over a hundred years ahead', () => {
    // given
    const checkedData = new Date(new Date().getTime() + HUNDRED_YEARS_IN_MILLISECONDS * 2);

    // when
    const isCorrect = isNewEventDateCorrect(checkedData);

    // then
    expect(isCorrect).toBeFalsy();
  });

  it('should return true, if date is the same like today', () => {
    // given
    const checkedData = new Date();

    // when
    const isCorrect = isNewEventDateCorrect(checkedData);

    // then
    expect(isCorrect).toBeTruthy();
  });
});
