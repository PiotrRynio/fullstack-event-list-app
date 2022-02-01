import { DomainEventPublisher } from '../../shared/Module/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../shared/Module/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../shared/Module/core/CurrentTimeProvider';
import { ModuleCore } from '../../shared/Module/core/ModuleCore';
import { EntityIdGenerator } from '../../shared/Module/core/application/EntityIdGenerator';
import { RegistrationsRepository } from './application/RegistrationsRepository';

export function RegistrationsModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
  repository: RegistrationsRepository,
): ModuleCore {
  return {
    commandHandlers: [],
    eventHandlers: [],
    queryHandlers: [],
  };
}
