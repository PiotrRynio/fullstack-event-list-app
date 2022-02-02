import { RegisteredEventsDto } from './RegisteredEventsDto';
import { RegisteredEvents } from './RegisteredEvents';

export const fromRegisteredEventsDto = ({
  registrationId,
  userEventData,
  userEmail,
  lastName,
  firstName,
}: RegisteredEventsDto): RegisteredEvents => {
  return { registrationId, firstName, lastName, email: userEmail, eventData: new Date(userEventData) };
};
