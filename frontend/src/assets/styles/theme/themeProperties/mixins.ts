import { css, Interpolation, ThemeProps } from 'styled-components';
import { fontWeights } from './fontWeights';
import { fontSizes } from './fonsSizes';
import { colors } from './colors';
import { fontFamilies } from './fontFamilies';
import { fontStyles } from './fontStyles';

export type Mixins = {
  typography: {
    heading2: ReadonlyArray<Interpolation<ThemeProps<any>>>;
    heading4: ReadonlyArray<Interpolation<ThemeProps<any>>>;
    overline: ReadonlyArray<Interpolation<ThemeProps<any>>>;
    regular: ReadonlyArray<Interpolation<ThemeProps<any>>>;
  };
};

export const mixins: Mixins = {
  typography: {
    regular: css`
      font-weight: ${() => fontWeights.regular};
      font-size: ${() => fontSizes.md};
      color: ${() => colors.regularText};
      font-family: ${() => fontFamilies.primary};
      font-style: ${() => fontStyles.normal};
    `,
    overline: css`
      font-size: ${() => fontSizes.sm};
      font-weight: ${() => fontWeights.regular};
      color: ${() => colors.regularText};
      font-family: ${() => fontFamilies.primary};
      font-style: ${() => fontStyles.normal};
      text-transform: uppercase;
    `,
    heading2: css`
      font-size: ${() => fontSizes.xxl};
      font-weight: ${() => fontWeights.light};
      color: ${() => colors.heading2};
      font-family: ${() => fontFamilies.primary};
      font-style: ${() => fontStyles.normal};
    `,
    heading4: css`
      font-size: ${() => fontSizes.md};
      font-weight: ${() => fontWeights.bold};
      color: ${() => colors.heading4};
      font-family: ${() => fontFamilies.primary};
      font-style: ${() => fontStyles.normal};
    `,
  },
};
