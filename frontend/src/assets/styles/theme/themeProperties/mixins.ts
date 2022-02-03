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
    validationHint: ReadonlyArray<Interpolation<ThemeProps<any>>>;
  };
  button: ReadonlyArray<Interpolation<ThemeProps<any>>>;
  textInput: ReadonlyArray<Interpolation<ThemeProps<any>>>;
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
      font-size: ${() => fontSizes.md};
      font-weight: ${() => fontWeights.regular};
      color: ${() => colors.regularText};
      font-family: ${() => fontFamilies.primary};
      font-style: ${() => fontStyles.normal};
      color: ${() => colors.overline};
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
    validationHint: css`
      font-size: ${() => fontSizes.md};
      font-weight: ${() => fontWeights.bold};
      color: ${() => colors.error};
      font-family: ${() => fontFamilies.primary};
      font-style: ${() => fontStyles.normal};
    `,
  },

  button: css`
    padding: 7px 15px;
    width: 120px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${() => fontSizes.md};
    font-family: ${() => fontFamilies.primary};
    font-weight: ${() => fontWeights.bold};
    text-decoration: none;
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.background};
    }
  `,

  textInput: css`
    padding: 11px 8px 11px 16px;
    border: 1px solid ${() => colors.primary};
    border-radius: 8px;
    line-height: 120%;
    font-size: ${() => fontSizes.md};
    font-family: ${() => fontFamilies.primary};
    color: ${() => colors.primary};

    &::placeholder {
      color: rgba(${() => colors.regularText}, 0.1);
    }

    &:focus {
      outline: none;
    }

    &--incorrect {
      color: rgba(${() => colors.error}, 0.4);
      border-color: ${() => colors.error};
    }

    &--incorrect::placeholder {
      color: rgba(${() => colors.error}, 0.4);
      border-color: ${() => colors.error};
    }
  `,
};
