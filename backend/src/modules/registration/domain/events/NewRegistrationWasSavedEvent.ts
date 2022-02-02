import { DomainEvent } from '../../../../shared/Module/domain/event/DomainEvent';

export class NewRegistrationWasSavedEvent implements DomainEvent {
  readonly occurredAt: Date;
  readonly registrationId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventData: Date;

  constructor(props: {
    occurredAt: Date;
    registrationId: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userEventData: Date;
  }) {
    this.occurredAt = props.occurredAt;
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}
