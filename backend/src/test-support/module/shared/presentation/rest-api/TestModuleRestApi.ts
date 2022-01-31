import supertest from 'supertest';
import express, { Express } from 'express';
import { CommandPublisherMock } from '../../core/CommandPublisherMock';
import { DomainEventPublisherMock } from '../../core/DomainEventPublisherMock';
import { QueryPublisherMock } from '../../core/QueryPublisherMock';
import { EntityIdGeneratorStub } from '../../core/EntityIdGeneratorStub';
import bodyParser from 'body-parser';
import { CommandPublisher } from '../../../../../shared/Module/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../../shared/Module/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../../shared/Module/core/application/query/QueryBus';
import { EntityIdGenerator } from '../../../../../shared/Module/core/application/EntityIdGenerator';
import { ModuleRestApi } from '../../../../../shared/Module/presentation/rest-api/ModuleRestApi';

export type ModuleRestApiFactory = (
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  entityIdGenerator: EntityIdGenerator,
) => ModuleRestApi;

export type TestModuleRestApiConfig = {
  readonly commandPublisher: CommandPublisher;
  readonly queryPublisher: QueryPublisher;
  readonly eventPublisher: DomainEventPublisher;
  readonly entityIdGenerator: EntityIdGenerator;
};

export const restApiTestModuleDefaultConfig: TestModuleRestApiConfig = {
  commandPublisher: CommandPublisherMock(),
  queryPublisher: QueryPublisherMock(),
  eventPublisher: DomainEventPublisherMock(),
  entityIdGenerator: EntityIdGeneratorStub('StubEntityId'),
};

export function testModuleRestApi(
  moduleRestApiFactory: ModuleRestApiFactory,
  config: Partial<TestModuleRestApiConfig> = restApiTestModuleDefaultConfig,
): { agent: supertest.SuperAgentTest } {
  const server = express();
  server.use(bodyParser.json());

  const restApiModuleConfig = { ...restApiTestModuleDefaultConfig, ...config };
  const restApiModule = moduleRestApiFactory(
    restApiModuleConfig.commandPublisher,
    restApiModuleConfig.eventPublisher,
    restApiModuleConfig.queryPublisher,
    restApiModuleConfig.entityIdGenerator,
  );
  server.use('/rest-api' + restApiModule.path, restApiModule.router);

  return testRestApi(server);
}

export function testRestApi(server: Express): { agent: supertest.SuperAgentTest } {
  const agent = supertest.agent(server);
  return { agent };
}
