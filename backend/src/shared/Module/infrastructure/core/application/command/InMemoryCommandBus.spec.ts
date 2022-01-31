import { CommandResult } from '../../../../core/application/command/CommandResult';
import { InMemoryCommandBus } from './InMemoryCommandBus';
import { CommandHandler } from '../../../../core/application/command/CommandHandler';
import { CommandBus } from '../../../../core/application/command/CommandBus';
import Success = CommandResult.Success;
import Failure = CommandResult.Failure;
import {
  FirstTestCommand,
  SecondTestCommand,
} from '../../../../../../test-support/module/fixtures/CommandsTestFixtures';

describe('InMemoryCommandBus', () => {
  const sampleId = 'SampleId';
  const sampleText = 'SampleText';

  describe('given registered command handler for FirstTestCommand returns success value', () => {
    let commandBus: CommandBus;

    beforeEach(() => {
      commandBus = new InMemoryCommandBus();
      const firstTestCommandHandler: CommandHandler<FirstTestCommand> = {
        async execute(command: FirstTestCommand): Promise<CommandResult> {
          return CommandResult.success({ testId: command.testId });
        },
      };
      commandBus.registerHandler(FirstTestCommand, firstTestCommandHandler);
    });

    describe('when command FirstTestCommand is executed', () => {
      const firstTestCommand = new FirstTestCommand({ testId: sampleId });
      let commandResult: CommandResult;
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      beforeEach(async () => {
        commandResult = await commandBus.execute(firstTestCommand);
      });

      it('then result is success', () => {
        expect(commandResult.isSuccess()).toBeTruthy();
        expect(commandResult).toBeInstanceOf(Success);
        expect((commandResult as Success).value).toStrictEqual({ testId: sampleId });
      });

      it('then result is not failure', () => {
        expect(commandResult).not.toBeInstanceOf(Failure);
      });

      describe('and command result is processed', () => {
        beforeEach(() => {
          commandResult.process(onSuccess, onFailure);
        });

        it('then onSuccess callback should be called', () => {
          expect(onSuccess).toBeCalledWith((commandResult as Success).value);
        });

        it('then onFailure callback should not be called', () => {
          expect(onFailure).not.toBeCalled();
        });
      });
    });

    it('when try to register another command handler for FirstTestCommand, then registering should fail', () => {
      const firstTestCommandHandler2: CommandHandler<FirstTestCommand> = {
        async execute(command: FirstTestCommand): Promise<CommandResult> {
          return CommandResult.success();
        },
      };

      expect(() => commandBus.registerHandler(FirstTestCommand, firstTestCommandHandler2)).toThrowError(
        `The command handler for the "FirstTestCommand" command was already registered!`,
      );
    });

    it('when try to execute command without registered handler, then executing should fail', async () => {
      const secondTestCommand = new SecondTestCommand({ testId: sampleId, testText: sampleText });

      await expect(commandBus.execute(secondTestCommand)).rejects.toThrowError(
        `The command handler for the "SecondTestCommand" command was not found!`,
      );
    });
  });

  describe('given registered command handler for FirstTestCommand returns failure reason', () => {
    let commandBus: CommandBus;

    beforeEach(() => {
      commandBus = new InMemoryCommandBus();
      const firstTestCommandHandler: CommandHandler<FirstTestCommand> = {
        async execute(command: FirstTestCommand): Promise<CommandResult> {
          return CommandResult.failureDueTo(new Error('FirstTestCommand has already existed!'));
        },
      };
      commandBus.registerHandler(FirstTestCommand, firstTestCommandHandler);
    });

    describe('when command FirstTestCommand is executed', () => {
      const firstTestCommand = new FirstTestCommand({ testId: sampleId });
      let commandResult: CommandResult;
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      beforeEach(async () => {
        commandResult = await commandBus.execute(firstTestCommand);
      });

      it('then result is failure', () => {
        expect(commandResult.isSuccess()).toBeFalsy();
        expect(commandResult).toBeInstanceOf(Failure);
        expect((commandResult as Failure).reason).toStrictEqual(new Error('FirstTestCommand has already existed!'));
      });

      it('then result is not success', () => {
        expect(commandResult).not.toBeInstanceOf(Success);
      });

      describe('and command result is processed', () => {
        beforeEach(() => {
          commandResult.process(onSuccess, onFailure);
        });

        it('then onSuccess callback should not be called', () => {
          expect(onSuccess).not.toBeCalled();
        });

        it('then onFailure callback should be called', () => {
          expect(onFailure).toBeCalledWith((commandResult as Failure).reason);
        });
      });
    });

    it('when try to register another command handler for FirstTestCommand, then registering should fail', () => {
      const firstTestCommandHandler2: CommandHandler<FirstTestCommand> = {
        async execute(command: FirstTestCommand): Promise<CommandResult> {
          return CommandResult.success();
        },
      };

      expect(() => commandBus.registerHandler(FirstTestCommand, firstTestCommandHandler2)).toThrowError(
        `The command handler for the "FirstTestCommand" command was already registered!`,
      );
    });

    it('when try to execute command without registered handler, then executing should fail', async () => {
      const secondTestCommand = new SecondTestCommand({ testId: sampleId, testText: sampleText });

      await expect(commandBus.execute(secondTestCommand)).rejects.toThrowError(
        `The command handler for the "SecondTestCommand" command was not found!`,
      );
    });
  });
});
