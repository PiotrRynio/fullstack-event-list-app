import { RegisteredEventsDto } from './RegisteredEventsDto';
import { RegisteredEvent } from './RegisteredEvent';

export const fromRegisteredEventDto = ({
  registrationId,
  userEventDate,
  userEmail,
  lastName,
  firstName,
}: RegisteredEventsDto): RegisteredEvent => {
  return { registrationId, firstName, lastName, email: userEmail, eventDate: new Date(userEventDate) };
};
