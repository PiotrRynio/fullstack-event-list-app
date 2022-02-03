import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { useRegisteredEventsMutation, UseRegisteredEventsMutationParams } from './useRegisteredEventsMutation';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Api useRegisteredEventsMutation Hooks tests', () => {
  const testEventsForRegistration: UseRegisteredEventsMutationParams = {
    firstName: 'Adam',
    lastName: 'Zet',
    email: 'adam@test.pl',
    eventData: new Date(),
  };

  it(`should render hook`, async () => {
    // when
    renderHook(() => useRegisteredEventsMutation(), {
      wrapper: createWrapper(),
    });
  });

  it('should be fetching data with success, after sending event', async () => {
    // given
    const { result, waitFor } = renderHook(() => useRegisteredEventsMutation(), {
      wrapper: createWrapper(),
    });

    // when
    result.current.mutate(testEventsForRegistration);

    // then
    await waitFor(() => result.current.isSuccess);
    const { error, isLoading, isSuccess } = result.current;
    expect(isSuccess).toBe(true);
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
  });

  it('should be return correct data, after sending event', async () => {
    // given
    const { result, waitFor } = renderHook(() => useRegisteredEventsMutation(), {
      wrapper: createWrapper(),
    });

    // when
    result.current.mutate(testEventsForRegistration);

    // then
    await waitFor(() => result.current.isSuccess);
    const { data } = result.current;
    const expectedDataArrayLength = result.current.data?.length || 0;
    const checkedRegisteredEvent = data && data[expectedDataArrayLength - 1];
    expect(checkedRegisteredEvent?.firstName).toBe(testEventsForRegistration.firstName);
    expect(checkedRegisteredEvent?.lastName).toBe(testEventsForRegistration.lastName);
    expect(checkedRegisteredEvent?.email).toBe(testEventsForRegistration.email);
    expect(checkedRegisteredEvent?.eventData.toLocaleDateString('en-CA')).toBe(
      testEventsForRegistration.eventData.toLocaleDateString('en-CA'),
    );
  });
});
