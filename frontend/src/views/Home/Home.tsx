import React from 'react';
import Typography from '../../components/Typography/Typography';
import { TypographyTag } from '../../components/Typography/TypographyTags';

const Home = () => {
  return (
    <div>
      <Typography typographyTag={TypographyTag.HEADING_2}>Registered Events:</Typography>
    </div>
  );
};

export default Home;
