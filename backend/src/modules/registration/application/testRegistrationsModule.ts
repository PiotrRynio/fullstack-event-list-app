import { TestModuleCore, testModuleCore } from '../../../test-support/module/shared/core/TestModuleCore';
import { RegistrationsModuleCore } from '../RegistrationsModuleCore';
import { InMemoryRegistrationRepository } from '../infrastructure/inmemory/InMemoryRegistrationsRepository';
import { UuidEntityIdGenerator } from '../../../shared/Module/infrastructure/core/application/UuidEntityIdGenerator';

export function testRegistrationsModule(currentTime: Date): TestModuleCore {
  const registrationRepository = new InMemoryRegistrationRepository();
  const entityIdGenerator = new UuidEntityIdGenerator();

  return testModuleCore((commandBus, eventBus, queryBus) =>
    RegistrationsModuleCore(eventBus, commandBus, () => currentTime, entityIdGenerator, registrationRepository),
  );
}
