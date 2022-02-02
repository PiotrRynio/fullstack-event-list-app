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

export const ListHeader = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-height: 30px;
  padding-top: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding-top: 16px;
  }
`;

export const ListHeaderCell = styled.div`
  text-align: center;
`;

export const ListWrapper = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 30vh;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const NoResultStatus = styled.h4`
  ${({ theme }) => theme.mixins.typography.heading6};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 10px 0 15px;
`;
