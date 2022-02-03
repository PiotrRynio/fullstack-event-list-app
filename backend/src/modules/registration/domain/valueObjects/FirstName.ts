import { FIRST_NAME_REGEX_PATTERN } from '../../../../constants/regexPatterns';

export class FirstName {
  private readonly TYPE = 'FirstName';

  constructor(readonly raw: string) {
    if (raw.length >= 20) {
      throw new Error('First name must have less then 20 characters.');
    }
    if (raw.length < 3) {
      throw new Error('First name must have at least 3 characters.');
    }
    if (!FIRST_NAME_REGEX_PATTERN.test(raw)) {
      throw new Error('First name must have only letters.');
    }
  }
}
