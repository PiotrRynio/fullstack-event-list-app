import 'jest-extended';
import { DatabaseTestSupport } from '../../../test-support/module/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../shared/Module/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../shared/Module/infrastructure/core/application/UuidEntityIdGenerator';
import { Registration } from '../domain/Registration';
import { RegistrationsRepository } from '../application/RegistrationsRepository';

export function RegistrationRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => RegistrationsRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: RegistrationsRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findAll returns empty list when nothing was saved', async () => {
      await props.databaseTestSupport.clearDatabase();

      expect(await repository.findAll()).toBeEmpty();
    });

    test('findAll returns all saved registrations', async () => {
      const registrationId1 = entityIdGenerator.generate();
      const firstName1 = 'testFirstName';
      const lastName1 = 'testLastName';
      const userEmail1 = 'testUserEmail@test.com';
      const userEventDate1 = new Date();

      const registrationId2 = entityIdGenerator.generate();
      const firstName2 = 'testFirstName2';
      const lastName2 = 'testLastName2';
      const userEmail2 = 'testUserEmail2@test.com';
      const userEventDate2 = new Date();

      const registration1 = new Registration({
        registrationId: registrationId1,
        firstName: firstName1,
        lastName: lastName1,
        userEmail: userEmail1,
        userEventDate: userEventDate1,
      });

      const registration2 = new Registration({
        registrationId: registrationId2,
        firstName: firstName2,
        lastName: lastName2,
        userEmail: userEmail2,
        userEventDate: userEventDate2,
      });

      await repository.save(registration1);
      await repository.save(registration2);

      expect(await repository.findAll()).toStrictEqual([registration1, registration2]);
    });
  });
}
