import React from 'react';
import { Wrapper } from './RegisteredEvent.styles';

type RegisteredEventProps = {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
  date: Date;
};

export const RegisteredEvent = ({}: RegisteredEventProps) => {
  return <Wrapper>RegisteredEvent</Wrapper>;
};
