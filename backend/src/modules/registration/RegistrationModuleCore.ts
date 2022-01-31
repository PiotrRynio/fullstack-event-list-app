import { DomainEventPublisher } from '../../shared/Module/core/application/event/DomainEventBus';
import { CommandPublisher } from '../../shared/Module/core/application/command/CommandBus';
import { CurrentTimeProvider } from '../../shared/Module/core/CurrentTimeProvider';
import { ModuleCore } from '../../shared/Module/core/ModuleCore';
import { EntityIdGenerator } from '../../shared/Module/core/application/EntityIdGenerator';

export function RegistrationModuleCore(
  eventPublisher: DomainEventPublisher,
  commandPublisher: CommandPublisher,
  currentTimeProvider: CurrentTimeProvider,
  entityIdGenerator: EntityIdGenerator,
  // repository: RegistrationRepository,
): ModuleCore {
  return {
    commandHandlers: [],
    eventHandlers: [],
    queryHandlers: [],
  };
}
