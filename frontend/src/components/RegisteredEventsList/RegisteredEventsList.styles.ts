import styled from 'styled-components';

export const Wrapper = styled.section`
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  gap: 8px 16px;
  width: 100%;
  height: calc(100vh - 200px);
  padding: 16px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    gap: 16px 32px;
    height: 100%;
  }
`;
