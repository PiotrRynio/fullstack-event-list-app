import { Typography, TypographyTag } from 'components/Typography';
import { RegisteredEvent } from 'components/RegisteredEvent';
import { Wrapper, ListHeader, ListHeaderCell, ListWrapper, NoResultStatus } from './RegisteredEventsList.styles';

export const RegisteredEventsList = () => {
  const listHeaderItems = ['Date', 'Author', 'Email'];
  const events = [
    { firstName: 'Jan1', lastName: 'Kowalski', email: 'jk@test.com', date: new Date() },
    { firstName: 'Jan2', lastName: 'Kowalski', email: 'jk@test.com', date: new Date() },
    { firstName: 'Jan3', lastName: 'Kowalski', email: 'jk@test.com', date: new Date() },
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
          <RegisteredEvent {...event} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};
