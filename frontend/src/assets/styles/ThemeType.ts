export type Theme = {
  fontFamily: { primary: string };
  fontSize: { xxs: string; xl: string; md: string; sm: string; xs: string; lg: string; xxl: string };
  breakpoints: { xxs: string; xl: string; md: string; sm: string; xs: string; lg: string; xxl: string };
  fontStyle: { normal: string };
  colors: {
    secondary: string;
    darkHard: string;
    redMedium: string;
    darkMedium: string;
    lightHard: string;
    primaryDark: string;
    primary: string;
    lightMedium: string;
  };
  fontWeight: { light: string; semiBold: string; bold: string; regular: string };
};
