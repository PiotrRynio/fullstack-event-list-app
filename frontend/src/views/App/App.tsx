import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'assets/styles';

import { Wrapper } from './App.styles';
import { theme } from 'assets/styles';
import { Navbar } from 'components/Navbar';
import { Home } from 'views/Home';

export const App = () => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <Navbar />
        <Home />
      </ThemeProvider>
    </Wrapper>
  );
};
