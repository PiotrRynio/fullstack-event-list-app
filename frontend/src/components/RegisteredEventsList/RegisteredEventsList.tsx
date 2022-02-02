import { Typography, TypographyTag } from 'components/Typography';
import { RegisteredEvent } from 'components/RegisteredEvent';
import { Wrapper, ListHeader, ListHeaderCell, ListWrapper, NoResultStatus } from './RegisteredEventsList.styles';
import { useRegisteredEvents } from '../../apiHooks/useRegisteredEvents';

export const RegisteredEventsList = () => {
  const { data } = useRegisteredEvents();
  console.log(data);

  const listHeaderItems = ['Date', 'Author', 'Email'];
  const events = [
    { id: '1', firstName: 'Jan1', lastName: 'Kowalski', email: 'jk@test.com', date: new Date() },
    { id: '2', firstName: 'Jan2', lastName: 'Kowalski', email: 'jk@test.com', date: new Date() },
    { id: '3', firstName: 'Jan3', lastName: 'Kowalski', email: 'jk@test.com', date: new Date() },
  ];

  return (
    <Wrapper>
      <ListHeader>
        {listHeaderItems.map((headerText) => (
          <ListHeaderCell key={headerText}>
            <Typography typographyTag={TypographyTag.HEADING_4}>{headerText}</Typography>
          </ListHeaderCell>
        ))}
      </ListHeader>

      {events && <NoResultStatus role="status">No results!</NoResultStatus>}

      <ListWrapper>
        {events.map((event) => (
          <RegisteredEvent {...event} key={event.id} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};
