import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-height: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const TableCell = styled.div`
  text-align: center;
`;
