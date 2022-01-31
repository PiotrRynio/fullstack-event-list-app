import { MongoTestSupport } from '../../../../test-support/module/shared/infrastructure/MongooseTestSupport';
import { RegistrationRepositoryTestCases } from '../RegistrationsRepositoryTestCases';

describe('TournamentDetailsRepository', () => {
  RegistrationRepositoryTestCases({
    name: 'MongoDb Implementation',
    repositoryFactory: () => new MongoRegistrationRepository(),
    databaseTestSupport: MongoTestSupport,
  });
});
