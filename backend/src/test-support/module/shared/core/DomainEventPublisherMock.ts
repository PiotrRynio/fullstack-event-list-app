import { DomainEventPublisher } from '../../../../shared/Module/core/application/event/DomainEventBus';
import { DomainEvent } from '../../../../shared/Module/domain/event/DomainEvent';

export function DomainEventPublisherMock(): DomainEventPublisher {
  const publishMock = jest.fn();
  return {
    publish: publishMock,
    publishAll(events: DomainEvent[]): any {
      events.forEach((event) => publishMock(event));
    },
  };
}
