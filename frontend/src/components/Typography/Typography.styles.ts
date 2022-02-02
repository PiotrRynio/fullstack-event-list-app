import styled from 'styled-components';

export const Regular = styled.p`
  ${({ theme }) => theme.mixins.typography.regular};
`;
export const Overline = styled.p`
  ${({ theme }) => theme.mixins.typography.overline};
`;
export const Heading2 = styled.h2`
  ${({ theme }) => theme.mixins.typography.heading2};
`;
export const Heading4 = styled.h4`
  ${({ theme }) => theme.mixins.typography.heading4};
`;
