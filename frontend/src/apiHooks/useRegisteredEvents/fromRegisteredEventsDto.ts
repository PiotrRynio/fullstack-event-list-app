import { RegisteredEventsDto } from './RegisteredEventsDto';

export const fromRegisteredEventsDto = ({
  registrationId,
  userEventData,
  userEmail,
  lastName,
  firstName,
}: RegisteredEventsDto) => {
  return { registrationId, firstName, lastName, userEmail, userEventData: new Date(userEventData) };
};
