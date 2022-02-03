import { CommandResult } from '../../../shared/Module/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { testRegistrationsModule } from './testRegistrationsModule';
import { RegisterCommand } from './RegisterCommand';

describe('Registration | Register', () => {
  it('given not existing registered item, when register, then registration were added', async () => {
    //Given
    const currentTime = new Date();
    const registrationModule = testRegistrationsModule(currentTime);
    const firstName = 'testFirstName';
    const lastName = 'testLastName';
    const userEmail = 'testUserEmail@test.com';
    const userEventDate = new Date();

    //When
    const registerCommand = new RegisterCommand({ firstName, lastName: lastName, userEmail, userEventDate });
    const commandResult = await registrationModule.executeCommand(registerCommand);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
  });

  it('given not existing registered item, when register with invalid email, then throw error', async () => {
    //Given
    const currentTime = new Date();
    const registrationModule = testRegistrationsModule(currentTime);
    const firstName = 'testFirstName';
    const lastName = 'testLastName';
    const userEmail = 'testUserEmail';
    const userEventDate = new Date();

    //When
    const registerCommand = new RegisterCommand({ firstName, lastName: lastName, userEmail, userEventDate });
    const commandResult = await registrationModule.executeCommand(registerCommand);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Email is not correct.'));
  });
});
