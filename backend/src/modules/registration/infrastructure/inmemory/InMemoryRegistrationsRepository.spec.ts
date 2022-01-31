import { InMemoryTestSupport } from '../../../../test-support/module/shared/infrastructure/InMemoryTestSupport';
import { RegistrationRepositoryTestCases } from '../RegistrationsRepositoryTestCases';

describe('RegistrationRepository', () => {
  RegistrationRepositoryTestCases({
    name: 'InMemory Implementation',
    repositoryFactory: () => new InMemoryRegistrationRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
