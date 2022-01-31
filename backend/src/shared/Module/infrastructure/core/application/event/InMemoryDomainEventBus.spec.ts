import { InMemoryDomainEventBus } from './InMemoryDomainEventBus';
import { DomainEventBus } from '../../../../core/application/event/DomainEventBus';
import { EventHandler } from '../../../../core/application/event/EventHandler';
import { DomainEvent } from '../../../../domain/event/DomainEvent';
import { FirstTestEvent, SecondTestEvent } from '../../../../../../test-support/module/fixtures/EventsTestFixtures';

describe('InMemoryDomainEventBus', () => {
  test('given event handlers are registered, when event is published, then all handlers of this event type should be called', () => {
    //Given
    const firstTestEventHandler1 = eventHandlerMock<FirstTestEvent>();
    const firstTestEventHandler2 = eventHandlerMock<FirstTestEvent>();
    const secondTestEventHandler = eventHandlerMock<SecondTestEvent>();
    const eventBus: DomainEventBus = new InMemoryDomainEventBus()
      .withHandler(FirstTestEvent, firstTestEventHandler1)
      .withHandler(FirstTestEvent, firstTestEventHandler2)
      .withHandler(SecondTestEvent, secondTestEventHandler);

    //When
    const firstTestEvent = new FirstTestEvent({ occurredAt: new Date() });
    eventBus.publish(firstTestEvent);

    //Then
    expect(firstTestEventHandler1.handle).toBeCalledWith(firstTestEvent);
    expect(firstTestEventHandler2.handle).toBeCalledWith(firstTestEvent);
    expect(secondTestEventHandler.handle).not.toBeCalled();
  });

  test('given no handlers registered, when event is published, then no handlers should be called', () => {
    //Given
    const firstTestEventHandler1 = eventHandlerMock<FirstTestEvent>();
    const eventBus: DomainEventBus = new InMemoryDomainEventBus();
    const firstTestEvent = new FirstTestEvent({ occurredAt: new Date() });

    //When
    eventBus.publish(firstTestEvent);

    //Then
    expect(firstTestEventHandler1.handle).not.toBeCalled();
  });
});

function eventHandlerMock<EventType extends DomainEvent>(): EventHandler<EventType> {
  return {
    handle: jest.fn(),
  };
}
