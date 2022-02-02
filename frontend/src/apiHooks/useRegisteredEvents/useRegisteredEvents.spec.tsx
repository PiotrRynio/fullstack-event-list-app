import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { useRegisteredEvents } from './useRegisteredEvents';
import { RegisteredEvents } from './RegisteredEvents';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Api useRegisteredEvents Hooks tests', () => {
  it(`should start loading if you call hook`, async () => {
    // when
    const { result } = renderHook(() => useRegisteredEvents(), {
      wrapper: createWrapper(),
    });

    // then
    expect(result.current.isLoading).toBe(true);
  });

  it('should be fetching data wih success, after waiting for data, if you call hook', async () => {
    // given
    const { result, waitFor } = renderHook(() => useRegisteredEvents(), {
      wrapper: createWrapper(),
    });

    // when
    await waitFor(() => result.current.isSuccess);

    // then
    const { error, isLoading, isLoadingError, isSuccess } = result.current;
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
    expect(isLoadingError).toBe(false);
    expect(isSuccess).toBe(true);
    expect(result.current.isSuccess).toBe(true);
  });

  test('should return correct data, after waiting for data', async () => {
    // given
    const { result, waitFor } = renderHook(() => useRegisteredEvents(), {
      wrapper: createWrapper(),
    });

    // when
    await waitFor(() => result.current.isSuccess);

    // then
    const correctRegisteredEventsDto: RegisteredEvents[] = [
      {
        firstName: 'Jan',
        lastName: 'Kowalski',
        registrationId: '18b48964-f99b-42dd-bf08-089b9fb6f7c5',
        email: 'jan.kowalski@test.pl',
        eventData: new Date('2022-02-02T06:59:19.000Z'),
      },
      {
        firstName: 'Katarzyna',
        lastName: 'Nowak',
        registrationId: 'd863bafc-3a99-440f-a59b-8646baeba0eb',
        email: 'kasia12@test.pl',
        eventData: new Date('2022-02-02T06:59:19.000Z'),
      },
    ];

    expect(result.current.data).toStrictEqual(correctRegisteredEventsDto);
  });
});
