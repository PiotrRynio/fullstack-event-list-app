import styled from 'styled-components';

export const Wrapper = styled.main`
  position: relative;
  flex-direction: column-reverse;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
  }
`;

export const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  height: calc(100vh - 155px);
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 250px;
    padding-left: 16px;
    height: 100%;
  }
`;
