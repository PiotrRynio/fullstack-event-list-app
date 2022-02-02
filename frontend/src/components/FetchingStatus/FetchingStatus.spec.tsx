import { render, screen } from 'test-utils';
import { FetchingStatus } from './FetchingStatus';

describe('FetchingStatus component', () => {
  it('should display error status, if component is rendered with true in isError props', () => {
    render(<FetchingStatus isError={true} isLoading={false} isNoResults={false} />);
    const status = screen.queryByRole(`status`);
    expect(status).toHaveTextContent(/Api error.../i);
  });

  it('should display error status, if component is rendered with true in isLoading props', () => {
    render(<FetchingStatus isError={false} isLoading={true} isNoResults={false} />);
    const status = screen.queryByRole(`status`);
    expect(status).toHaveTextContent(/Loading.../i);
  });

  it('should display error status, if component is rendered with true in isNoResults props', () => {
    render(<FetchingStatus isError={false} isLoading={false} isNoResults={true} />);
    const status = screen.queryByRole(`status`);
    expect(status).toHaveTextContent(/No results!/i);
  });

  it('should not display anything, if component is rendered with false in props', () => {
    render(<FetchingStatus isError={false} isLoading={false} isNoResults={false} />);
    const status = screen.queryByRole(`status`);
    expect(status).not.toBeInTheDocument();
  });
});
