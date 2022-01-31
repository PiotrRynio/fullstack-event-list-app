import { DomainEvent } from '../../../../shared/Module/domain/event/DomainEvent';

export class NewRegistrationWasSavedEvent implements DomainEvent {
  readonly occurredAt: Date;
  readonly registrationId: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly userEmail: string;
  readonly userEventData: Date;

  constructor(props: {
    occurredAt: Date;
    registrationId: string;
    firstName: string;
    secondName: string;
    userEmail: string;
    userEventData: Date;
  }) {
    this.occurredAt = props.occurredAt;
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}
