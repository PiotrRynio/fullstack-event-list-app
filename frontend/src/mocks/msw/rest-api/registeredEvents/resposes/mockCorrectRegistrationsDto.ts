import { MockRegistrationsDto } from './MockReqistrationsDtoType';
import { dateWithoutClockTime } from 'utils/dateWithoutClockTime/dateWithoutClockTime';

export const mockCorrectRegistrationsDto: MockRegistrationsDto[] = [
  {
    registrationId: '18b48964-f99b-42dd-bf08-089b9fb6f7c5',
    firstName: 'Jan',
    lastName: 'Kowalski',
    userEmail: 'jan.kowalski@test.pl',
    userEventDate: dateWithoutClockTime().toString(),
  },
  {
    registrationId: 'd863bafc-3a99-440f-a59b-8646baeba0eb',
    firstName: 'Katarzyna',
    lastName: 'Nowak',
    userEmail: 'kasia12@test.pl',
    userEventDate: dateWithoutClockTime().toString(),
  },
];
