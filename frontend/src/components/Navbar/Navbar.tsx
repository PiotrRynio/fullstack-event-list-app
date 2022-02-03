import React from 'react';
import logo from 'assets/images/logo.png';
import { Wrapper, Stripe, Logo } from './Navbar.styles';
import { APP_NAME } from 'constants/names';

export const Navbar = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt={`App logo of ${APP_NAME} `} />
      <Stripe />
    </Wrapper>
  );
};
