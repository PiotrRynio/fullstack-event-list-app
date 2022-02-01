import { MongoTestSupport } from '../../../../test-support/module/shared/infrastructure/MongooseTestSupport';
import { RegistrationRepositoryTestCases } from '../RegistrationsRepositoryTestCases';
import { MongoRegistrationsRepository } from './MongoRegistrationsRepository';

describe('RegistrationsRepository', () => {
  RegistrationRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoRegistrationsRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
