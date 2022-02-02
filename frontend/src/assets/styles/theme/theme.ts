import { Mixins, mixins } from './themeProperties/mixins';
import { Breakpoints, breakpoints } from './themeProperties/breakpoints';
import { fontSizes, FontSizes } from './themeProperties/fonsSizes';
import { FontFamilies, fontFamilies } from './themeProperties/fontFamilies';
import { Colors, colors } from './themeProperties/colors';
import { fontStyles, FontStyles } from './themeProperties/fontStyles';
import { FontWeights, fontWeights } from './themeProperties/fontWeights';

export type Theme = {
  breakpoints: Breakpoints;
  fontFamilies: FontFamilies;
  fontSizes: FontSizes;
  fontStyles: FontStyles;
  colors: Colors;
  fontWeights: FontWeights;
  mixins: Mixins;
};

export const theme: Theme = {
  breakpoints,
  colors,
  fontFamilies,
  fontSizes,
  fontStyles,
  fontWeights,
  mixins,
};
