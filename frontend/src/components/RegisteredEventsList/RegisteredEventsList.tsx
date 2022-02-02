import { Typography, TypographyTag } from 'components/Typography';
import { RegisteredEvent } from 'components/RegisteredEvent';
import { Wrapper, ListHeader, ListHeaderCell, ListWrapper } from './RegisteredEventsList.styles';
import { useRegisteredEvents } from '../../apiHooks/useRegisteredEvents';
import { FetchingStatus } from '../FetchingStatus';

export const RegisteredEventsList = () => {
  const listHeaderItems = ['Date', 'Author', 'Email'];

  const { data: queryData, isError, isLoading } = useRegisteredEvents();
  const isNoResults = !!queryData && !queryData.length;

  console.log(isNoResults);

  return (
    <Wrapper>
      <ListHeader>
        {listHeaderItems.map((headerText) => (
          <ListHeaderCell key={headerText}>
            <Typography typographyTag={TypographyTag.HEADING_4}>{headerText}</Typography>
          </ListHeaderCell>
        ))}
      </ListHeader>

      <FetchingStatus isError={isError} isLoading={isLoading} isNoResults={isNoResults} />

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
