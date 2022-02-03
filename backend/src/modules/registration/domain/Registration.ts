import { DomainCommandResult } from '../../../shared/Module/core/domain/DomainCommandResult';
import { DATE_REGEX_PATTERN, FIRST_NAME_REGEX_PATTERN } from '../../../constants/regexPatterns';
import { isNewEventDateCorrect } from '../../../utils/isNewEventDateCorrect/isNewEventDateCorrect';
import { NewRegistrationWasSavedEvent } from './events/NewRegistrationWasSavedEvent';
import { EmailAddress } from './valueObjects/EmailAddress';

export class Registration {
  readonly registrationId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventData: Date;

  constructor(props: {
    registrationId: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userEventData: Date;
  }) {
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}

export function registerNewRecord(
  currentTime: Date,
  entityId: string,
  command: { firstName: string; lastName: string; userEmail: EmailAddress; userEventData: Date },
): DomainCommandResult<Registration> {
  const registrationId = entityId;

  if (command.firstName.length >= 20) {
    throw new Error('First name must have less then 20 characters.');
  }
  if (command.firstName.length < 3) {
    throw new Error('First name must have at least 3 characters.');
  }
  if (!FIRST_NAME_REGEX_PATTERN.test(command.firstName)) {
    throw new Error('First name must have only letters.');
  }

  if (command.lastName.length >= 20) {
    throw new Error('Last name must have less then 20 characters.');
  }
  if (command.lastName.length < 3) {
    throw new Error('Last name must have at least 3 characters.');
  }
  if (!FIRST_NAME_REGEX_PATTERN.test(command.lastName)) {
    throw new Error('Last name must have only letters.');
  }

  if (!DATE_REGEX_PATTERN.test(command.userEventData.toISOString().split('T')[0])) {
    throw new Error('Date must be in correct format.');
  }
  if (!isNewEventDateCorrect(command.userEventData)) {
    throw new Error('Date must be from now to a hundred years ahead.');
  }

  const newState = new Registration({
    registrationId: registrationId,
    firstName: command.firstName,
    lastName: command.lastName,
    userEmail: command.userEmail.raw,
    userEventData: command.userEventData,
  });

  const newRegistrationWasSavedEvent = new NewRegistrationWasSavedEvent({
    ...newState,
    occurredAt: currentTime,
  });

  return { state: newState, events: [newRegistrationWasSavedEvent] };
}
