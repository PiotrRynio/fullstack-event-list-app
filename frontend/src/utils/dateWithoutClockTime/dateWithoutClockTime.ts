export const dateWithoutClockTime = (customDate?: string): Date =>
  customDate
    ? new Date(new Date(customDate).toLocaleDateString('en-CA'))
    : new Date(new Date().toLocaleDateString('en-CA'));
