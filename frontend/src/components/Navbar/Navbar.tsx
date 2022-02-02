import React from 'react';
import logo from 'assets/images/logo.png';
import { Wrapper, Stripe, Logo } from './Navbar.styles';

export const Navbar = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="App logo of Full Stack Event List" aria-label="app logo" />
      <Stripe />
    </Wrapper>
  );
};
