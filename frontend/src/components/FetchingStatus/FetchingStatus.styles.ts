import styled from 'styled-components';

export const Text = styled.p`
  ${({ theme }) => theme.mixins.typography.heading4};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
