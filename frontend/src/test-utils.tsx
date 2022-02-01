import React from 'react';
import { render } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const customRender = (ui: React.ReactElement, options?: any) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
