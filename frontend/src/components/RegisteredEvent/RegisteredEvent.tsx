import { Typography, TypographyTag } from 'components/Typography';
import { TableCell, Wrapper } from './RegisteredEvent.styles';

type RegisteredEventProps = {
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
};
export const RegisteredEvent = ({ firstName, lastName, email, date }: RegisteredEventProps) => {
  return (
    <Wrapper>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{date.toLocaleDateString('en-CA')}</Typography>
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
