import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0 16px;
  }
`;
