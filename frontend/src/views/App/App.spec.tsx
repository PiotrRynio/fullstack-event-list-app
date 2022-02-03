import { App } from './App';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { HUNDRED_YEARS_IN_MILLISECONDS } from 'constants/times';
import { dateWithoutClockTime } from 'utils/dateWithoutClockTime/dateWithoutClockTime';

describe(`App |`, () => {
  describe(`Integration tests |`, () => {
    it('renders app component with app logo', () => {
      // when
      render(<App />);

      // then
      const logo = screen.getByRole('img', { name: /app logo/i });
      expect(logo).toHaveAttribute('src', 'logo.png');
      expect(logo).toHaveAttribute('alt', 'App logo of Full Stack Event List');
    });

    it('cleans inputs and adds event in events list, if you fill correct date and click submit button', async () => {
      // given
      const currentDate = dateWithoutClockTime();
      const correctFutureDate = new Date(currentDate.getTime() + HUNDRED_YEARS_IN_MILLISECONDS / 2);
      const correctTestEventDetails = {
        firstName: 'Alicja',
        lastName: 'Kowal',
        email: 'AlicjaKowal@test.com',
        eventDate: correctFutureDate.toLocaleDateString('en-CA'),
      };

      // when
      render(<App />);
      const { firstNameInput, lastNameInput, emailInput, dateInput } =
        fillInputsAndClickSubmitButton(correctTestEventDetails);

      // then
      await waitFor(() => expect(firstNameInput).toHaveValue(''));
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(dateInput).toHaveValue(currentDate.toLocaleDateString('en-CA'));
      await waitFor(async () => await screen.findByText('Alicja Kowal'));
      screen.getByText(`${correctTestEventDetails.firstName} ${correctTestEventDetails.lastName}`);
      screen.getByText(correctTestEventDetails.email);
      screen.getByText(correctTestEventDetails.eventDate);
    });
  });
});

const fillInputsAndClickSubmitButton = ({
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

  const submitButton = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitButton);

  return { firstNameInput, lastNameInput, emailInput, dateInput };
};
