import { useQuery, UseQueryResult } from 'react-query';
import { validateResponse } from 'apiHooks/validateResponse';
import { REGISTRATIONS_PATH, REST_API_URL } from 'constants/restApiPaths';
import { fromRegisteredEventsDto } from './fromRegisteredEventsDto';
import { RegisteredEventsDto } from './RegisteredEventsDto';
import { RegisteredEvents } from './RegisteredEvents';

export const useRegisteredEvents = (): UseQueryResult<RegisteredEvents[]> =>
  useQuery([], async () => {
    const response = await fetch(`${REST_API_URL}${REGISTRATIONS_PATH}`);
    await validateResponse(response);
    const fetchedData: { registrations: RegisteredEventsDto[] } = await response.json();

    const registeredEvents = fetchedData.registrations.map(fromRegisteredEventsDto);
    return registeredEvents;
  });
