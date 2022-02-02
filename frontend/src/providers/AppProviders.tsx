import { QueryClient, QueryClientProvider } from 'react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyles } from 'assets/styles/GlobalStyles';
import { primaryFont } from 'assets/styles';
import { APP_NAME } from 'constants/names';

const queryClient = new QueryClient();

const InitialHelmet = () => (
  <Helmet>
    <title>{APP_NAME}</title>
    <link rel="stylesheet" href={primaryFont} />
  </Helmet>
);

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <InitialHelmet />
        <ThemeProvider theme={theme}>
          <GlobalStyles theme={theme} />
          {children}
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};
