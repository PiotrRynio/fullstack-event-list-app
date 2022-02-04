import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.formBackground};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    padding: 32px 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

export const Label = styled.label`
  margin-bottom: 4px;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin-bottom: 8px;
  }
`;

export const Input = styled.input`
  ${({ theme }) => theme.mixins.textInput}
  width: 220px;
`;

export const ValidationHint = styled.p`
  ${({ theme }) => theme.mixins.typography.validationHint};
  text-align: right;
  height: 20px;
`;

export const Button = styled.button`
  ${({ theme }) => theme.mixins.button};
  margin-top: 16px;
`;
