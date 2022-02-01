import { css } from 'styled-components';
import { Theme } from './ThemeType';

export const theme: Theme = {
  breakpoints: {
    xxs: '400px',
    xs: '480px',
    sm: '560px',
    md: '768px',
    lg: '1024px',
    xl: '1260px',
    xxl: '1900px',
  },
  colors: {
    primary: '#4eadc5',
    secondary: '#fff',
    primaryDark: '#324b72',
    darkHard: '#000000',
    darkMedium: '#111',
    lightMedium: '#fff',
    lightHard: '#FFF',
    redMedium: '#de212b',
  },
  fontFamily: {
    primary: `'Source Sans Pro', sans-serif`,
  },
  fontSize: {
    xxs: '8px',
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
  },
  fontStyle: {
    normal: 'normal',
  },
  fontWeight: {
    light: '300',
    regular: '400',
    semiBold: '600',
    bold: '700',
  },
};
