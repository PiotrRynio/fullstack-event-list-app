import { Mixins, mixins } from './mixins';
import { Breakpoints, breakpoints } from './breakpoints';
import { fontSizes, FontSizes } from './fonsSizes';
import { FontFamilies, fontFamilies } from './fontFamilies';
import { Colors, colors } from './colors';
import { fontStyles, FontStyles } from './fontStyles';
import { FontWeights, fontWeights } from './fontWeights';

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
