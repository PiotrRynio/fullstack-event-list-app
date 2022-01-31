import { DomainCommandResult } from '../../../shared/Module/core/domain/DomainCommandResult';
import { NewRegistrationWasSavedEvent } from './events/NewRegistrationWasSavedEvent';

export class Registration {
  readonly registrationId: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly userEmail: string;
  readonly userEventData: string;

  constructor(props: {
    registrationId: string;
    firstName: string;
    secondName: string;
    userEmail: string;
    userEventData: string;
  }) {
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}

export function addRegistration(
  currentTime: Date,
  entityId: string,
  command: { firstName: string; secondName: string; userEmail: string; userEventData: string },
): DomainCommandResult<Registration> {
  const registrationId = entityId;

  const newRegistrationWasSavedEvent = new NewRegistrationWasSavedEvent({
    occurredAt: currentTime,
    registrationId: registrationId,
    firstName: command.firstName,
    secondName: command.secondName,
    userEmail: command.userEmail,
    userEventData: command.userEventData,
  });

  const newState = new Registration({
    registrationId: registrationId,
    firstName: command.firstName,
    secondName: command.secondName,
    userEmail: command.userEmail,
    userEventData: command.userEventData,
  });

  return { state: newState, events: [newRegistrationWasSavedEvent] };
}
