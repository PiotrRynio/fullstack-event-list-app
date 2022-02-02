import { Home } from './Home';
import { render, screen } from 'test-utils';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Registered Events/i);
  expect(linkElement).toBeInTheDocument();
});
