import { render } from '@testing-library/react';
import { AppProviders } from 'providers/AppProviders';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppProviders>{children}</AppProviders>;
};

const customRender = (ui: React.ReactElement, options?: any) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
