import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import Home from 'views/Home/Home';
import { Wrapper } from './App.styles';

export const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Home />
    </Wrapper>
  );
};
