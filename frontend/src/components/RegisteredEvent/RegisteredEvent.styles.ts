import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  min-height: 100px;
  width: 100%;
  max-width: 320px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.eventItemBackground};
  overflow: hidden;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 70px 100px;
  width: 100%;
`;
