import { DomainCommandResult } from '../../../shared/Module/core/domain/DomainCommandResult';
import { NewRegistrationWasSavedEvent } from './events/NewRegistrationWasSavedEvent';

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
  command: { firstName: string; lastName: string; userEmail: string; userEventData: Date },
): DomainCommandResult<Registration> {
  const registrationId = entityId;

  // TODO: Email and data validation!

  const newRegistrationWasSavedEvent = new NewRegistrationWasSavedEvent({
    occurredAt: currentTime,
    registrationId: registrationId,
    firstName: command.firstName,
    lastName: command.lastName,
    userEmail: command.userEmail,
    userEventData: command.userEventData,
  });

  const newState = new Registration({
    registrationId: registrationId,
    firstName: command.firstName,
    lastName: command.lastName,
    userEmail: command.userEmail,
    userEventData: command.userEventData,
  });

  return { state: newState, events: [newRegistrationWasSavedEvent] };
}
