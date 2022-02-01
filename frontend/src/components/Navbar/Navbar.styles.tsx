import styled from 'styled-components';

export const Wrapper = styled.nav`
  position: relative;
  width: 100%;
  min-height: 100px;
  padding: 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const Logo = styled.img`
  display: block;
  width: 112px;
  height: 53px;
`;

export const Stripe = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background-color: blue;
`;
