import { createGlobalStyle } from 'styled-components';
import { Theme, theme } from './theme';

interface GlobalStylesProps {
  theme: Theme;
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${() => theme.fontFamilies.primary};
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    border-right: 1px  ${({ theme }) => theme.colors.primary} solid;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.primary};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
    -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.primary};
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
