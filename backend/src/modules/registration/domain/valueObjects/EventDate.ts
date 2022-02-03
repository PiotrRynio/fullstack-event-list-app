import { DATE_REGEX_PATTERN } from '../../../../constants/regexPatterns';
import { isNewEventDateCorrect } from '../../../../utils/isNewEventDateCorrect/isNewEventDateCorrect';

export class EventDate {
  private readonly TYPE = 'EventDate';

  constructor(readonly raw: Date) {
    if (!DATE_REGEX_PATTERN.test(raw.toISOString().split('T')[0])) {
      throw new Error('Date must be in correct format.');
    }
    if (!isNewEventDateCorrect(raw)) {
      throw new Error('Date must be from now to a hundred years ahead.');
    }
  }
}
