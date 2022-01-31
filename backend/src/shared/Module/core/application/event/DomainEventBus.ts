import { DomainEvent } from '../../../domain/event/DomainEvent';
import { EventHandler } from './EventHandler';
import { HasConstructor } from '../../../common/HasConstructor';

export interface DomainEventSubscriber {
  registerHandler<EventType extends DomainEvent>(
    eventType: HasConstructor<EventType>,
    handler: EventHandler<EventType>,
  ): void;
}

export interface DomainEventPublisher {
  publish(event: DomainEvent): any;
  publishAll(events: DomainEvent[]): any;
}

export interface DomainEventBus extends DomainEventSubscriber, DomainEventPublisher {}
