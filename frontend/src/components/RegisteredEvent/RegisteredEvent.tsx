import { Typography, TypographyTag } from 'components/Typography';
import { Row, Wrapper } from './RegisteredEvent.styles';
import React from 'react';

type RegisteredEventProps = {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;
};
export const RegisteredEvent = ({ firstName, lastName, email, eventDate }: RegisteredEventProps) => {
  return (
    <Wrapper>
      <Row>
        <Typography typographyTag={TypographyTag.HEADING_4}>{`Author: `}</Typography>
        <Typography typographyTag={TypographyTag.REGULAR}>{`${firstName} ${lastName}`}</Typography>
      </Row>
      <Row>
        <Typography typographyTag={TypographyTag.HEADING_4}>{`Date: `}</Typography>
        <Typography typographyTag={TypographyTag.REGULAR}>{eventDate.toLocaleDateString('en-CA')}</Typography>
      </Row>
      <Row>
        <Typography typographyTag={TypographyTag.HEADING_4}>{`Email: `}</Typography>
        <Typography typographyTag={TypographyTag.REGULAR}>{email}</Typography>
      </Row>
    </Wrapper>
  );
};
