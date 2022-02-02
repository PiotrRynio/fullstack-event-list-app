export type MockRegistrationsDto = {
  registrationId: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userEventData: string;
};

const registrations: MockRegistrationsDto[] = [
  {
    registrationId: '18b48964-f99b-42dd-bf08-089b9fb6f7c5',
    firstName: 'Jan',
    lastName: 'Kowalski',
    userEmail: 'jan.kowalski@test.pl',
    userEventData: 'Wed Feb 02 2022 07:59:19 GMT+0100 (czas środkowoeuropejski standardowy)',
  },
  {
    registrationId: 'd863bafc-3a99-440f-a59b-8646baeba0eb',
    firstName: 'Katarzyna',
    lastName: 'Nowak',
    userEmail: 'kasia12@test.pl',
    userEventData: 'Wed Feb 02 2022 07:59:19 GMT+0100 (czas środkowoeuropejski standardowy)',
  },
];

export const registrationsResponse = {
  registrations,
};
