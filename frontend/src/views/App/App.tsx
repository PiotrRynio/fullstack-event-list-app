import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import Navbar from 'components/Navbar/Navbar';
import Home from 'views/Home/Home';
import { Wrapper } from './App.styles';

export const App = () => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Home />
      </ThemeProvider>
    </Wrapper>
  );
};
