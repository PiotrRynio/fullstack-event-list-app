import { Wrapper } from './App.styles';
import { Navbar } from 'components/Navbar';
import { Home } from 'views/Home';

export const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Home />
    </Wrapper>
  );
};
