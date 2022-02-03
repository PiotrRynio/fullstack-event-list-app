import { render, screen } from 'test-utils';
import { Navbar } from './Navbar';

describe(`Navbar`, () => {
  it('should display logo, when component is rendered', () => {
    render(<Navbar />);
    const image = screen.getByRole('img', { name: /App logo of Full Stack Event List/i });
    expect(image).toBeInTheDocument();
  });
});
