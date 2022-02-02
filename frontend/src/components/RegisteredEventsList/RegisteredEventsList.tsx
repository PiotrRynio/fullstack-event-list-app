import { Typography, TypographyTag } from 'components/Typography';
import { RegisteredEvent } from 'components/RegisteredEvent';
import { Wrapper, ListHeader, ListHeaderCell, ListWrapper, NoResultStatus } from './RegisteredEventsList.styles';
import { useRegisteredEvents } from '../../apiHooks/useRegisteredEvents';

export const RegisteredEventsList = () => {
  const { data: queryData } = useRegisteredEvents();

  const listHeaderItems = ['Date', 'Author', 'Email'];

  return (
    <Wrapper>
      <ListHeader>
        {listHeaderItems.map((headerText) => (
          <ListHeaderCell key={headerText}>
            <Typography typographyTag={TypographyTag.HEADING_4}>{headerText}</Typography>
          </ListHeaderCell>
        ))}
      </ListHeader>

      {!queryData && <NoResultStatus role="status">No results!</NoResultStatus>}

      <ListWrapper>
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
