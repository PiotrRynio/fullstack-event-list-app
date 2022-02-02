import { render, screen, waitForElementToBeRemoved, waitFor } from 'test-utils';
import {
  getRegisteredEventsIsLoading,
  getRegisteredEventsWillReturn,
  getRegisteredEventsWillReturnFail,
} from 'mocks/msw/rest-api/registeredEvents/mockEndpoints/registeredEventsRestApiMockEndpoints';
import { mockRegistrationsDto } from 'mocks/msw/rest-api/registeredEvents/resposes/mockRegistrationsDto';
import { RegisteredEventsList } from './RegisteredEventsList';

describe('RegisteredEventsList component', () => {
  it('should render component correctly', () => {
    // when
    render(<RegisteredEventsList />);
  });

  it('should display table headers, if component rendered', () => {
    // given
    render(<RegisteredEventsList />);

    // then
    screen.getByText(/Date/i);
    screen.getByText(/Author/i);
    screen.getByText(/Email/i);
  });

  it('should display loading status, if data are not fetched yet during component rendering', () => {
    // given
    getRegisteredEventsIsLoading();
    render(<RegisteredEventsList />);

    // then
    const displayedStatus = screen.queryByRole(`status`);
    expect(displayedStatus).toHaveTextContent(/Loading.../i);
    expect(displayedStatus).toBeInTheDocument();
  });

  it('should display list items, when page is loaded', async () => {
    // given
    getRegisteredEventsWillReturn(mockRegistrationsDto);
    render(<RegisteredEventsList />);

    //when
    await waitForElementToBeRemoved(() => screen.queryByRole(`status`), { timeout: 10000 });

    // then
    screen.getByText(/Jan Kowalski/i);
    screen.getByText(/jan.kowalski@test.pl/i);
    screen.getByText(/Katarzyna Nowak/i);
    screen.getByText(/kasia12@test.pl/i);
  });

  it('should display error api information, if api returns no results status', async () => {
    // given
    getRegisteredEventsWillReturn([]);
    render(<RegisteredEventsList />);

    // when
    const noResultsStatus = await waitFor(() => screen.findByText(/No results/i), { timeout: 10000 });

    // then
    expect(noResultsStatus).toBeInTheDocument();
  }, 10000);

  it('should display error api information, when api returns error', async () => {
    // given
    getRegisteredEventsWillReturnFail();
    render(<RegisteredEventsList />);

    // when
    const errorStatus = await waitFor(() => screen.findByText(/Api error.../i), { timeout: 10000 });

    // then
    expect(errorStatus).toBeInTheDocument();
  }, 10000);
});
