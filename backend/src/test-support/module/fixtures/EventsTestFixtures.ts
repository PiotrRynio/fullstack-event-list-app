import { DomainEvent } from '../../../shared/Module/domain/event/DomainEvent';

export class FirstTestEvent implements DomainEvent {
  readonly occurredAt: Date;

  constructor(props: { occurredAt: Date }) {
    this.occurredAt = props.occurredAt;
  }
}

export class SecondTestEvent implements DomainEvent {
  static readonly eventType: string = 'testEventText';
  readonly occurredAt: Date;

  constructor(props: { occurredAt: Date }) {
    this.occurredAt = props.occurredAt;
  }
}
