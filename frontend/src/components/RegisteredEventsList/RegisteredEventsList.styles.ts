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

interface ListWrapperProps {
  isEmpty?: boolean;
}

export const ListWrapper = styled.div<ListWrapperProps>`
  overflow-y: scroll;
  max-height: 30vh;
  width: 100%;
  border: 1px ${({ isEmpty }) => !isEmpty && 'solid'} ${({ theme }) => theme.colors.primary};
`;
