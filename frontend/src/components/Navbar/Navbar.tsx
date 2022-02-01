import React from 'react';
import logo from 'assets/images/logo.png';
import { Wrapper, Stripe, Logo } from './Navbar.styles';

const Navbar = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="App logo of Game of Thrones" aria-label="app logo" />
      <Stripe />
    </Wrapper>
  );
};

export default Navbar;
