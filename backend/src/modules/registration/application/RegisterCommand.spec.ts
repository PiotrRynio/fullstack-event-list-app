import Failure = CommandResult.Failure;
import { CommandResult } from '../../../shared/Module/core/application/command/CommandResult';
import {testRegistrationsModule} from "./testRegistrationsModule";


describe('Registration | Register', () => {
  it('given not existing registered item, when register, then registration were added', async () => {
    //Given
    const currentTime = new Date();
    const registrationModule = testRegistrationsModule(currentTime);
    const registrationId = 'testRegistrationId';
    const firstName = 'testFirstName';
    const secondName = 'testSecondName';
    const userEmail = 'testUserEmail@test.com';
    const userEventData = new Date();

    //When
    const registerCommand = new RegisterCommand({ registrationId, firstName, secondName, userEmail, userEventData });
    const commandResult = await registrationModule.executeCommand(registerCommand);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
  });

  it('given not existing registered item, when register with invalid email, then throw error', async () => {
    //Given
    const currentTime = new Date();
    const registrationModule = testRegistrationsModule(currentTime);
    const registrationId = 'testRegistrationId';
    const firstName = 'testFirstName';
    const secondName = 'testSecondName';
    const userEmail = 'testUserEmail';
    const userEventData = new Date();

    //When
    const registerCommand = new RegisterCommand({ registrationId, firstName, secondName, userEmail, userEventData });
    const commandResult = await registrationModule.executeCommand(registerCommand);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Email must be correct.'));
  });
});
