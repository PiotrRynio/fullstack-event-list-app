import { EMAIL_REGEX_PATTERN } from '../../../../constants/regexPatterns';

export class EmailAddress {
  private readonly TYPE = 'EmailAddress';

  constructor(readonly raw: string) {
    if (!EMAIL_REGEX_PATTERN.test(raw)) {
      throw new Error('Email is not correct.');
    }
  }
}
