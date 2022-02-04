import { useEffect } from 'react';
import { RegisteredEvent } from 'components/RegisteredEvent';
import { useRegisteredEvents } from 'apiHooks/useRegisteredEvents';
import { FETCHING_STATUS, FetchingStatus } from 'components/FetchingStatus';
import { useAppContext } from 'context/AppContext';
import { Wrapper } from './RegisteredEventsList.styles';

export const RegisteredEventsList = () => {
  const { registeredEvents, setRegisteredEvents } = useAppContext();
  const { data: queryData, isError, isLoading } = useRegisteredEvents();
  const isNoResults = !!queryData && !queryData.length;

  useEffect(() => {
    if (queryData) {
      setRegisteredEvents(queryData);
    }
  }, [queryData]);

  const fetchingStatus =
    (isError && FETCHING_STATUS.ERROR) ||
    (isLoading && FETCHING_STATUS.LOADING) ||
    (isNoResults && FETCHING_STATUS.NO_RESULTS) ||
    undefined;

  return (
    <Wrapper>
      <FetchingStatus fetchingStatus={fetchingStatus} />
      {registeredEvents
        ?.sort((firstEvent, secondEvent) => secondEvent.eventDate.getTime() - firstEvent.eventDate.getTime())
        .map(({ firstName, lastName, email, eventDate, registrationId }) => (
          <RegisteredEvent
            key={registrationId}
            firstName={firstName}
            lastName={lastName}
            eventDate={eventDate}
            email={email}
          />
        ))}
    </Wrapper>
  );
};
