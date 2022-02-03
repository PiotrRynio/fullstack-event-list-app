import { useMutation } from 'react-query';
import { validateResponse } from 'apiHooks/validateResponse';
import { REGISTRATIONS_PATH, REST_API_URL } from 'constants/restApiPaths';
import { RegisteredEventsDto } from './RegisteredEventsDto';
import { EventToRegistrationDto } from './EventToRegistrationDto';
import { fromRegisteredEventDto } from './fromRegisteredEventDto';

export type UseRegisteredEventsMutationParams = {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;
};

export const useRegisteredEventsMutation = () =>
  useMutation(async ({ firstName, lastName, email, eventDate }: UseRegisteredEventsMutationParams) => {
    const eventsForRegistrationDto: EventToRegistrationDto = {
      firstName,
      lastName,
      userEmail: email,
      userEventDate: eventDate.toString(),
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventsForRegistrationDto),
    };

    const response = await fetch(`${REST_API_URL}${REGISTRATIONS_PATH}`, requestOptions);
    await validateResponse(response);
    const fetchedData: { registrations: RegisteredEventsDto[] } = await response.json();
    return fetchedData.registrations.map(fromRegisteredEventDto);
  });
