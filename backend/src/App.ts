import { config } from 'dotenv';
import { Express } from 'express';
import { Module } from './shared/Module/Module';
import { isDefined } from './shared/Module/common/Defined';
import { initializeModuleCores } from './shared/Module/core/InitializeModuleCores';
import { CommandBus } from './shared/Module/core/application/command/CommandBus';
import { DomainEventBus } from './shared/Module/core/application/event/DomainEventBus';
import { QueryBus } from './shared/Module/core/application/query/QueryBus';
import { CurrentTimeProvider } from './shared/Module/core/CurrentTimeProvider';
import { EntityIdGenerator } from './shared/Module/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from './shared/Module/infrastructure/core/application/UuidEntityIdGenerator';
import { StoreAndForwardDomainEventBus } from './shared/Module/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from './shared/Module/infrastructure/core/application/event/InMemoryDomainEventBus';
import { LoggingDomainEventBus } from './shared/Module/infrastructure/core/application/event/LoggingDomainEventBus';
import { RetryCommandBus } from './shared/Module/infrastructure/core/application/command/RetryCommandBus';
import { LoggingCommandBus } from './shared/Module/infrastructure/core/application/command/LoggingCommandBus';
import { InMemoryCommandBus } from './shared/Module/infrastructure/core/application/command/InMemoryCommandBus';
import { InMemoryQueryBus } from './shared/Module/infrastructure/core/application/query/InMemoryQueryBus';
import { ModuleCore } from './shared/Module/core/ModuleCore';
import { ModuleRestApi } from './shared/Module/presentation/rest-api/ModuleRestApi';
import { restApiExpressServer } from './shared/Module/infrastructure/rest-api/Server';
import { connectToMongoDb } from './shared/Module/infrastructure/repository/connectToMongoDb';

config();

export type App = { restApi: Express };

export const App = async (
  commandBus: CommandBus = new RetryCommandBus(new LoggingCommandBus(new InMemoryCommandBus()), 10),
  eventBus: DomainEventBus = new LoggingDomainEventBus(new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus())),
  queryBus: QueryBus = new InMemoryQueryBus(),
  currentTimeProvider: CurrentTimeProvider = () => new Date(),
  entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator(),
): Promise<App> => {
  await connectToMongoDb();

  const modules: Module[] = [].filter(isDefined);

  const modulesCores: ModuleCore[] = modules.map((module) => module.core);
  initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

  const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
  const restApi = restApiExpressServer(modulesRestApis);

  return { restApi };
};
