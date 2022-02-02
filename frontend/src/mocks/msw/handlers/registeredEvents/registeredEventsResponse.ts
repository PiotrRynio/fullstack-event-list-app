export type MockRegistrationsDto = {
  registrationId: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userEventData: string;
};

const registrations: MockRegistrationsDto[] = [];

export const registrationsResponse = {
  registrations: registrations,
};
