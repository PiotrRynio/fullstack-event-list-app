import { render, screen } from 'test-utils';
import { FETCHING_STATUS, FetchingStatus } from './FetchingStatus';

describe('FetchingStatus component', () => {
  it('should display "error" status, if component is rendered with ERROR in props', () => {
    // when
    render(<FetchingStatus fetchingStatus={FETCHING_STATUS.ERROR} />);

    // then
    const status = screen.queryByRole(`status`);
    expect(status).toHaveTextContent(/Api error.../i);
  });

  it('should display "loading" status, if component is rendered with LOADING in props', () => {
    // when
    render(<FetchingStatus fetchingStatus={FETCHING_STATUS.LOADING} />);

    // then
    const status = screen.queryByRole(`status`);
    expect(status).toHaveTextContent(/Loading.../i);
  });

  it('should display "no results" status, if component is rendered with NO_RESULTS in props', () => {
    // when
    render(<FetchingStatus fetchingStatus={FETCHING_STATUS.NO_RESULTS} />);

    // then
    const status = screen.queryByRole(`status`);
    expect(status).toHaveTextContent(/No results!/i);
  });

  it('should not display anything, if component is rendered without props', () => {
    // when
    render(<FetchingStatus />);

    // then
    const status = screen.queryByRole(`status`);
    expect(status).not.toBeInTheDocument();
  });
});
