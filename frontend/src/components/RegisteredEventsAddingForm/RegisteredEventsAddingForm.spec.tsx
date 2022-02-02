import { render, screen, waitForElementToBeRemoved, waitFor } from 'test-utils';
import { RegisteredEventsAddingForm } from './RegisteredEventsAddingForm';

describe('RegisteredEventsAddingForm component', () => {
  it('should render component correctly', () => {
    // when
    render(<RegisteredEventsAddingForm />);
  });
});
