import { render, screen } from 'test-utils';
import { Home } from './Home';

describe(`Home`, () => {
  it('should display title, when component is rendered', () => {
    render(<Home />);
    const title = screen.getByRole('heading', { level: 2, name: /Registered Events/i });
    expect(title).toBeInTheDocument();
  });
});
