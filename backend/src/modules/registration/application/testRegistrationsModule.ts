import { TestModuleCore, testModuleCore } from '../../../test-support/module/shared/core/TestModuleCore';
import { RegistrationsModuleCore } from '../RegistrationsModuleCore';

export function testRegistrationsModule(currentTime: Date): TestModuleCore {
  const registrationRepository = new InMemoryRegistrationsRepository();

  return testModuleCore((commandBus, eventBus, queryBus) =>
    RegistrationsModuleCore(eventBus, commandBus, () => currentTime, registrationRepository),
  );
}
