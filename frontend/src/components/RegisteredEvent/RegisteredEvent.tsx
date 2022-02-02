import { Typography, TypographyTag } from 'components/Typography';
import { TableCell, Wrapper } from './RegisteredEvent.styles';

type RegisteredEventProps = {
  firstName: string;
  secondName: string;
  email: string;
  date: Date;
};
export const RegisteredEvent = ({ firstName, secondName, email, date }: RegisteredEventProps) => {
  return (
    <Wrapper>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{date.toLocaleDateString('en-CA')}</Typography>
      </TableCell>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{`${firstName} ${secondName}`}</Typography>
      </TableCell>
      <TableCell>
        <Typography typographyTag={TypographyTag.REGULAR}>{email}</Typography>
      </TableCell>
    </Wrapper>
  );
};
