import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from 'test-utils';
import { RegisteredEventsAddingForm } from './RegisteredEventsAddingForm';
import { HUNDRED_YEARS_IN_MILLISECONDS } from 'constants/times';

describe('RegisteredEventsAddingForm component', () => {
  const currentDate = new Date();
  const correctTestEventDetails = {
    firstName: 'Adam',
    lastName: 'Nowak',
    email: 'AdamNowak@test.com',
    eventDate: currentDate.toLocaleDateString('en-CA'),
  };

  it('should render component correctly', () => {
    // when
    render(<RegisteredEventsAddingForm />);
  });

  it('should display form title, when component is rendered', () => {
    // when
    render(<RegisteredEventsAddingForm />);

    // then
    const title = screen.getByRole('heading', { level: 4, name: /add new event/i });
    expect(title).toBeInTheDocument();
  });

  it('should display form elements, when component is rendered', () => {
    // given
    const inputsLabelsText = [/first name/i, /last name/i, /email/i, /event date/i];
    const inputsPlaceholders = [/write your first name/i, /write your last name/i, /write your email/i];

    // when
    render(<RegisteredEventsAddingForm />);

    // then
    inputsLabelsText.map((inputLabelText) => screen.getByLabelText(inputLabelText));
    inputsPlaceholders.map((inputsPlaceholder) => screen.getByPlaceholderText(inputsPlaceholder));
    screen.getByLabelText(/date picker input/i);
    screen.getByRole('button', { name: /submit/i });
  });

  it('should display filed form, when you fill form correct', () => {
    // given
    render(<RegisteredEventsAddingForm />);

    // when
    const { firstNameInput, lastNameInput, emailInput, dateInput } = fillAndCheckInputsValues(correctTestEventDetails);

    // then
    expect(firstNameInput).toHaveValue(correctTestEventDetails.firstName);
    expect(lastNameInput).toHaveValue(correctTestEventDetails.lastName);
    expect(emailInput).toHaveValue(correctTestEventDetails.email);
    expect(dateInput).toHaveValue(correctTestEventDetails.eventDate);
  });

  it('should send form, when you click submit button, if you filled form correct', async () => {
    // given
    render(<RegisteredEventsAddingForm />);
    const { firstNameInput, lastNameInput, emailInput, dateInput } = fillAndCheckInputsValues(correctTestEventDetails);

    // when
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    // then
    await waitFor(() => expect(firstNameInput).toHaveValue(''));
    expect(lastNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(dateInput).toHaveValue(correctTestEventDetails.eventDate);
  });

  it('should display validation hints and no clean inputs, when you click submit button, if you filled form incorrect', async () => {
    // given
    const correctTestEventDetails = {
      firstName: 'A%',
      lastName: 'N*',
      email: 'Adam@Nowak@test.com',
      eventDate: new Date(currentDate.getTime() - HUNDRED_YEARS_IN_MILLISECONDS).toLocaleDateString('en-CA'),
    };
    render(<RegisteredEventsAddingForm />);
    const { firstNameInput, lastNameInput, emailInput, dateInput } = fillAndCheckInputsValues(correctTestEventDetails);

    // when
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    // then
    await waitFor(() => screen.findAllByLabelText(/Invalid first name/i));
    screen.getByLabelText(/Invalid first name/i);
    screen.getByLabelText(/Invalid last name/i);
    screen.getByLabelText(/Invalid email address/i);
    screen.getByLabelText(/Invalid future date/i);
    expect(firstNameInput).toHaveValue(correctTestEventDetails.firstName);
    expect(lastNameInput).toHaveValue(correctTestEventDetails.lastName);
    expect(emailInput).toHaveValue(correctTestEventDetails.email);
    expect(dateInput).toHaveValue(correctTestEventDetails.eventDate);
  });
});

const fillAndCheckInputsValues = ({
  firstName,
  lastName,
  email,
  eventDate,
}: {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
}) => {
  const firstNameInputLabel = screen.getByLabelText(/first name/i);
  const lastNameInputLabel = screen.getByLabelText(/last name/i);
  const emailInputLabel = screen.getByLabelText(/email/i);
  const dateInputLabel = screen.getByLabelText(/event date/i);

  const firstNameInput = screen.getByPlaceholderText(/write your first name/i);
  const lastNameInput = screen.getByPlaceholderText(/write your last name/i);
  const emailInput = screen.getByPlaceholderText(/write your email/i);
  const dateInput = screen.getByLabelText(/date picker input/i);

  userEvent.type(firstNameInputLabel, firstName);
  userEvent.type(lastNameInputLabel, lastName);
  userEvent.type(emailInputLabel, email);
  userEvent.type(dateInputLabel, eventDate);

  return { firstNameInput, lastNameInput, emailInput, dateInput };
};
