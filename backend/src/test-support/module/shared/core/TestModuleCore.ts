import { InMemoryCommandBus } from '../../../../shared/Module/infrastructure/core/application/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from '../../../../shared/Module/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryQueryBus } from '../../../../shared/Module/infrastructure/core/application/query/InMemoryQueryBus';
import { QueryBus } from '../../../../shared/Module/core/application/query/QueryBus';
import { CommandBus } from '../../../../shared/Module/core/application/command/CommandBus';
import { InMemoryDomainEventBus } from '../../../../shared/Module/infrastructure/core/application/event/InMemoryDomainEventBus';
import { ModuleCore } from '../../../../shared/Module/core/ModuleCore';
import { DomainEventBus } from '../../../../shared/Module/core/application/event/DomainEventBus';
import { Query } from '../../../../shared/Module/core/application/query/Query';
import { Command } from '../../../../shared/Module/core/application/command/Command';
import { DomainEvent } from '../../../../shared/Module/domain/event/DomainEvent';
import { CommandResult } from '../../../../shared/Module/core/application/command/CommandResult';

export type TestModuleCore = {
  publishedEvents(): DomainEvent[];
  lastPublishedEvent(): DomainEvent | undefined;
  publishEvent(event: DomainEvent): void;
  executeCommand<CommandType extends Command>(command: CommandType): Promise<CommandResult>;
  executeQuery<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType>;
};

export type ModuleCoreFactory = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => ModuleCore;

export function testModuleCore(
  moduleCoreFactory: ModuleCoreFactory,
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus()),
  queryBus: QueryBus = new InMemoryQueryBus(),
): TestModuleCore {
  const moduleCore = moduleCoreFactory(commandBus, eventBus, queryBus);
  moduleCore.commandHandlers.forEach((commandHandler) =>
    commandBus.registerHandler(commandHandler.commandType, commandHandler.handler),
  );
  moduleCore.eventHandlers.forEach((eventHandler) =>
    eventBus.registerHandler(eventHandler.eventType, eventHandler.handler),
  );
  moduleCore.queryHandlers.forEach((queryHandler) =>
    queryBus.registerHandler(queryHandler.queryType, queryHandler.handler),
  );

  return {
    publishEvent(event: DomainEvent): void {
      eventBus.publish(event);
    },
    publishedEvents(): DomainEvent[] {
      return eventBus.storedEvents;
    },
    lastPublishedEvent(): DomainEvent | undefined {
      return eventBus.storedEvents.reverse()[0];
    },
    executeCommand<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      return commandBus.execute(command);
    },
    executeQuery<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType> {
      return queryBus.execute(query);
    },
  };
}
