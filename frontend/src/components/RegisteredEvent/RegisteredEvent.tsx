import { Typography, TypographyTag } from 'components/Typography';
import { TableCell, Wrapper } from './RegisteredEvent.styles';

type RegisteredEventProps = {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;
};
export const RegisteredEvent = ({ firstName, lastName, email, eventDate }: RegisteredEventProps) => {
  return (
    <Wrapper>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{eventDate.toLocaleDateString('en-CA')}</Typography>
      </TableCell>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{`${firstName} ${lastName}`}</Typography>
      </TableCell>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{email}</Typography>
      </TableCell>
    </Wrapper>
  );
};
