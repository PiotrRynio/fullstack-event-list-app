import React from 'react';
import { Typography, TypographyTag } from 'components/Typography';
import { Wrapper } from './Home.styles';
import { RegisteredEventsList } from 'components/RegisteredEventsList/RegisteredEventsList';
import { RegisteredEventsAddingForm } from 'components/RegisteredEventsAddingForm';

export const Home = () => {
  return (
    <Wrapper>
      <Typography typographyTag={TypographyTag.HEADING_2}>Registered Events:</Typography>
      <RegisteredEventsList />
      <RegisteredEventsAddingForm />
    </Wrapper>
  );
};
