import React from 'react';
import { RegisteredEventsList } from 'components/RegisteredEventsList';
import { Typography, TypographyTag } from 'components/Typography';
import { Wrapper } from './Home.styles';

export const Home = () => {
  return (
    <Wrapper>
      <Typography typographyTag={TypographyTag.HEADING_2}>Registered Events:</Typography>
      <RegisteredEventsList />
    </Wrapper>
  );
};
