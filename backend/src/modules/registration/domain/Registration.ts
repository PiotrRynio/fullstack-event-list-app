import { DomainCommandResult } from '../../../shared/Module/core/domain/DomainCommandResult';
import { NewRegistrationWasSavedEvent } from './events/NewRegistrationWasSavedEvent';
import { EmailAddress } from './valueObjects/EmailAddress';
import { LastName } from './valueObjects/LastName';
import { FirstName } from './valueObjects/FirstName';
import { RegistrationId } from './valueObjects/RegistrationId';
import { EventDate } from './valueObjects/EventDate';

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
  registrationId: RegistrationId,
  command: { firstName: FirstName; lastName: LastName; userEmail: EmailAddress; userEventData: EventDate },
): DomainCommandResult<Registration> {
  const newState = new Registration({
    registrationId: registrationId.raw,
    firstName: command.firstName.raw,
    lastName: command.lastName.raw,
    userEmail: command.userEmail.raw,
    userEventData: command.userEventData.raw,
  });

  const newRegistrationWasSavedEvent = new NewRegistrationWasSavedEvent({
    ...newState,
    occurredAt: currentTime,
  });

  return { state: newState, events: [newRegistrationWasSavedEvent] };
}
