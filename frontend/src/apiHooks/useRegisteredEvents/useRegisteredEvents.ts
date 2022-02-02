import { useQuery, UseQueryResult } from 'react-query';
import { validateResponse } from 'apiHooks/validateResponse';
import { REGISTRATIONS_PATH } from 'constants/restApiPaths';
import { fromRegisteredEventsDto } from './fromRegisteredEventsDto';
import { RegisteredEventsDto } from './RegisteredEventsDto';

export const useRegisteredEvents = (): UseQueryResult<{}> =>
  useQuery([], async () => {
    const response = await fetch(`${process.env.REST_API_URL}/${REGISTRATIONS_PATH}`);
    await validateResponse(response);
    const fetchedData: { registrations: RegisteredEventsDto[] } = await response.json();
    const registeredEvents = fetchedData.registrations.map(fromRegisteredEventsDto);
    return registeredEvents;
  });
