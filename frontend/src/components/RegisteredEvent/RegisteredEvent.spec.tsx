import React from 'react';
import { render, screen } from 'test-utils';
import { RegisteredEvent } from './RegisteredEvent';

describe('RegisteredEvent component', () => {
  const testFirstName = 'Jan';
  const testSecondName = 'Kowalski';
  const testEmail = 'test@test.com';
  const testDate = new Date('18-03-2021 20:17');

  it('should render correct', () => {
    render(<RegisteredEvent firstName={testFirstName} secondName={testSecondName} email={testEmail} date={testDate} />);
  });

  it('should display event details, if component is rendered', () => {
    // given
    render(<RegisteredEvent firstName={testFirstName} secondName={testSecondName} email={testEmail} date={testDate} />);

    // then
    screen.getByText(testFirstName);
    screen.getByText(testSecondName);
    screen.getByText(testEmail);
    screen.getByText('2021-03-18');
  });
});
