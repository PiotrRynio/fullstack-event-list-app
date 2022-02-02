import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'assets/styles/GlobalStyles';

import Navbar from 'components/Navbar/Navbar';
import Home from 'views/Home/Home';
import { Wrapper } from './App.styles';
import { theme } from 'assets/styles/theme';

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
