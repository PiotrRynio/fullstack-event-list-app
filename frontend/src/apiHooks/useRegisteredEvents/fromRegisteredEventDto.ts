import { RegisteredEventsDto } from './RegisteredEventsDto';
import { RegisteredEvent } from './RegisteredEvent';

export const fromRegisteredEventDto = ({
  registrationId,
  userEventData,
  userEmail,
  lastName,
  firstName,
}: RegisteredEventsDto): RegisteredEvent => {
  return { registrationId, firstName, lastName, email: userEmail, eventData: new Date(userEventData) };
};
