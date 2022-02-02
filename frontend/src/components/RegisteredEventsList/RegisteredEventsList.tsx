import { Typography, TypographyTag } from 'components/Typography';
import { RegisteredEvent } from 'components/RegisteredEvent';
import { Wrapper, ListHeader, ListHeaderCell, ListWrapper } from './RegisteredEventsList.styles';
import { useRegisteredEvents } from 'apiHooks/useRegisteredEvents';
import { FETCHING_STATUS, FetchingStatus } from 'components/FetchingStatus';

export const RegisteredEventsList = () => {
  const listHeaderItems = ['Date', 'Author', 'Email'];

  const { data: queryData, isError, isLoading } = useRegisteredEvents();
  const isNoResults = !!queryData && !queryData.length;

  const fetchingStatus =
    (isError && FETCHING_STATUS.ERROR) ||
    (isLoading && FETCHING_STATUS.LOADING) ||
    (isNoResults && FETCHING_STATUS.NO_RESULTS) ||
    undefined;

  return (
    <Wrapper>
      <ListHeader>
        {listHeaderItems.map((headerText) => (
          <ListHeaderCell key={headerText}>
            <Typography typographyTag={TypographyTag.HEADING_4}>{headerText}</Typography>
          </ListHeaderCell>
        ))}
      </ListHeader>

      <FetchingStatus fetchingStatus={fetchingStatus} />

      <ListWrapper isEmpty={isNoResults}>
        {queryData?.map(({ firstName, lastName, email, eventData, registrationId }) => (
          <RegisteredEvent
            key={registrationId}
            firstName={firstName}
            lastName={lastName}
            eventDate={eventData}
            email={email}
          />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};
