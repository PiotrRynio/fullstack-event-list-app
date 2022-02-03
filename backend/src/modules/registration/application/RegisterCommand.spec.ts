import { CommandResult } from '../../../shared/Module/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { HUNDRED_YEARS_IN_MILLISECONDS } from '../../../constants/times';
import { testRegistrationsModule } from './testRegistrationsModule';
import { RegisterCommand } from './RegisterCommand';

describe('Registration |', () => {
  const currentTime = new Date();

  const defaultRegisterCommand = {
    firstName: 'Adam',
    lastName: 'Nowak',
    userEmail: 'adamNowak@test.com',
    userEventDate: new Date(),
  };

  describe('All |,', () => {
    describe('when correct item is being registered,', () => {
      it('then registration were added', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();
      });
    });
  });

  describe('First Name |,', () => {
    describe('when registered item is being registered,', () => {
      it('if first name is too short, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const firstName = 'Ad';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, firstName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
          new Error('First name must have at least 3 characters.'),
        );
      });

      it('wif first name is too long, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const firstName = 'Addddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaammmmmmmmmmmmmmmmmm';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, firstName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
          new Error('First name must have less then 20 characters.'),
        );
      });

      it('if first name has not allowed character, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const firstName = 'Ad*am';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, firstName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('First name must have only letters.'));
      });

      it('if first name has space character, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const firstName = 'Ad am';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, firstName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('First name must have only letters.'));
      });
    });
  });

  describe('Last Name |,', () => {
    describe('when registered item is being registered,', () => {
      it('if last name is too short, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const lastName = 'No';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, lastName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
          new Error('Last name must have at least 3 characters.'),
        );
      });

      it('if last name is too long, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const lastName = 'Nooooooowwwwwwwaaaaaaaaaaaakkkkkkkkkk';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, lastName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
          new Error('Last name must have less then 20 characters.'),
        );
      });

      it('if last name has not allowed character, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const lastName = 'No&wak';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, lastName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Last name must have only letters.'));
      });

      it('if last name has space character, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const lastName = 'Nowak  ';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, lastName });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Last name must have only letters.'));
      });
    });
  });

  describe('Email |,', () => {
    describe('when registered item is being registered,', () => {
      it('if email is invalid, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const userEmail = 'adam@nowak@com.pl';

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, userEmail });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Email is not correct.'));
      });
    });
  });

  describe('Event Date |,', () => {
    describe('when registered item is being registered,', () => {
      it('if data is before today, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const userEventDate = new Date(new Date().getTime() - HUNDRED_YEARS_IN_MILLISECONDS);

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, userEventDate });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
          new Error('Date must be from now to a hundred years ahead.'),
        );
      });

      it('if date is over a hundred years ahead, then throw error', async () => {
        //Given
        const registrationModule = testRegistrationsModule(currentTime);
        const userEventDate = new Date(new Date().getTime() + HUNDRED_YEARS_IN_MILLISECONDS * 2);

        //When
        const registerCommand = new RegisterCommand({ ...defaultRegisterCommand, userEventDate });
        const commandResult = await registrationModule.executeCommand(registerCommand);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect((commandResult as Failure).reason).toStrictEqual(
          new Error('Date must be from now to a hundred years ahead.'),
        );
      });
    });
  });
});
