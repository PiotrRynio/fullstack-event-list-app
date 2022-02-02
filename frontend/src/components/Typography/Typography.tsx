import React from 'react';
import { TypographyTag } from './TypographyTags';
import { Regular, Overline, Heading2 } from './Typography.styles';

export type TypographyProps = {
  typographyTag: TypographyTag;
  children?: React.ReactNode;
};

const renderTypography = ({ typographyTag, children, ...props }: TypographyProps) => {
  switch (typographyTag) {
    case TypographyTag.REGULAR:
      return <Regular {...props}>{children}</Regular>;
    case TypographyTag.OVERLINE:
      return <Overline {...props}>{children}</Overline>;
    case TypographyTag.HEADING_2:
      return <Heading2 {...props}>{children}</Heading2>;
    default:
      return <p>{children}</p>;
  }
};

export const Typography = (props: TypographyProps) => {
  return renderTypography(props);
};
