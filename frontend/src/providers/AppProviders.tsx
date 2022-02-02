import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyles } from 'assets/styles/GlobalStyles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { primaryFont } from 'assets/styles';
import { APP_NAME } from '../constants/names';

const InitialHelmet = () => (
  <Helmet>
    <title>{APP_NAME}</title>
    <link rel="stylesheet" href={primaryFont} />
  </Helmet>
);

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <InitialHelmet />
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </ThemeProvider>
    </HelmetProvider>
  );
};
