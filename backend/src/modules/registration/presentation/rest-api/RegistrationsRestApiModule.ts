import { CommandPublisher } from '../../../../shared/Module/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/Module/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/Module/core/application/query/QueryBus';
import { ModuleRestApi } from '../../../../shared/Module/presentation/rest-api/ModuleRestApi';
import { registrationsRouter } from './RegistrationsRouter';

export function RegistrationsRestApiModule(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): ModuleRestApi {
  return {
    router: registrationsRouter(commandPublisher, eventPublisher, queryPublisher),
    path: '/registrations',
  };
}
