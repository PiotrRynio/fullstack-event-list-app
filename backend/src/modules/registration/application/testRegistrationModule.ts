import { TestModuleCore, testModuleCore } from '../../../test-support/module/shared/core/TestModuleCore';
import { RegistrationModuleCore } from '../RegistrationModuleCore';

export function testRegistrationModule(currentTime: Date): TestModuleCore {
  const registrationRepository = new InMemoryRegistrationRepository();

  return testModuleCore((commandBus, eventBus, queryBus) =>
    RegistrationModuleCore(eventBus, commandBus, () => currentTime, registrationRepository),
  );
}
