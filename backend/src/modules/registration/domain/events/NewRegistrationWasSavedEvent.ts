import { DomainEvent } from '../../../../shared/Module/domain/event/DomainEvent';

export class NewRegistrationWasSavedEvent implements DomainEvent {
  readonly occurredAt: Date;
  readonly registrationId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventDate: Date;

  constructor(props: {
    occurredAt: Date;
    registrationId: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userEventDate: Date;
  }) {
    this.occurredAt = props.occurredAt;
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.userEmail = props.userEmail;
    this.userEventDate = props.userEventDate;
  }
}
