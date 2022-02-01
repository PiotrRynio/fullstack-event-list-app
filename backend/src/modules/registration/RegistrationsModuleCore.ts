import { DomainEventPublisher } from '../../shared/Module/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../shared/Module/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../shared/Module/core/CurrentTimeProvider';
import { ModuleCore } from '../../shared/Module/core/ModuleCore';
import { EntityIdGenerator } from '../../shared/Module/core/application/EntityIdGenerator';
import { RegistrationsRepository } from './application/RegistrationsRepository';
import { RegisterCommand } from './application/RegisterCommand';
import { RegisterCommandHandler } from './application/RegisterCommandHandler';
import { FindAllRegistrationsQueryHandler } from './application/FindAllRegistrationsQueryHandler';
import { FindAllRegistrationsQuery } from './application/FindAllRegistrationsQuery';

export function RegistrationsModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
  repository: RegistrationsRepository,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: RegisterCommand,
        handler: new RegisterCommandHandler(eventPublisher, currentTimeProvider, repository, entityIdGenerator),
      },
    ],
    eventHandlers: [],
    queryHandlers: [
      {
        queryType: FindAllRegistrationsQuery,
        handler: new FindAllRegistrationsQueryHandler(repository),
      },
    ],
  };
}
