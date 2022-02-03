import { App } from './App';
import { render, screen } from 'test-utils';

it('renders app component with app logo', () => {
  // when
  render(<App />);

  // then
  const logo = screen.getByRole('img', { name: /app logo/i });
  expect(logo).toHaveAttribute('src', 'logo.png');
  expect(logo).toHaveAttribute('alt', 'App logo of Full Stack Event List');
});
