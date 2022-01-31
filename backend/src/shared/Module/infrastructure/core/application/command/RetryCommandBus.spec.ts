import Failure = CommandResult.Failure;
import Success = CommandResult.Success;
import {
  CommandBusMock,
  CommandBusResultsMock,
} from '../../../../../../test-support/module/shared/core/CommandBusMock';
import { CommandResult } from '../../../../core/application/command/CommandResult';
import { RetryCommandBus } from './RetryCommandBus';
import { FirstTestCommand } from '../../../../../../test-support/module/fixtures/CommandsTestFixtures';

describe('RetryCommandBus', function () {
  const testId = 'SampleId';

  it('when every command fails, then should retried max number of retires', async () => {
    const alwaysFailCommandBus = CommandBusMock(CommandResult.failureDueTo(new Error('Mock error')));
    const commandBus = new RetryCommandBus(alwaysFailCommandBus, 3);

    const firstTestCommand = new FirstTestCommand({ testId: testId });
    const result = await commandBus.execute(firstTestCommand);

    expect(alwaysFailCommandBus.executeCalls).toBeCalledTimes(4);
    expect(result.isSuccess()).toBeFalsy();
    expect((result as Failure).reason).toStrictEqual(new Error('Mock error'));
  });

  it('when one of command executions succeed, then should stop retrying', async () => {
    const commandBusMock = CommandBusResultsMock([
      CommandResult.failureDueTo(new Error('First execution error')),
      CommandResult.failureDueTo(new Error('1st retry error value')),
      CommandResult.success('2th retry success value'),
    ]);
    const commandBus = new RetryCommandBus(commandBusMock, 5);

    const firstTestCommand = new FirstTestCommand({ testId: testId });
    const result = await commandBus.execute(firstTestCommand);

    expect(commandBusMock.executeCalls).toBeCalledTimes(3);
    expect(result.isSuccess()).toBeTruthy();
    expect((result as Success).value).toStrictEqual('2th retry success value');
  });

  it('when every command succeed, then should not execute retries', async () => {
    const alwaysSucceedCommandBus = CommandBusMock(CommandResult.success('execution success value'));
    const commandBus = new RetryCommandBus(alwaysSucceedCommandBus, 100);

    const firstTestCommand = new FirstTestCommand({ testId: testId });
    const result = await commandBus.execute(firstTestCommand);

    expect(alwaysSucceedCommandBus.executeCalls).toBeCalledTimes(1);
    expect(result.isSuccess()).toBeTruthy();
    expect((result as Success).value).toStrictEqual('execution success value');
  });

  it('when no retires, then execute command only once', async () => {
    const alwaysFailCommandBus = CommandBusMock(CommandResult.failureDueTo(new Error('Mock error')));
    const commandBus = new RetryCommandBus(alwaysFailCommandBus, 0);

    const firstTestCommand = new FirstTestCommand({ testId: testId });
    const result = await commandBus.execute(firstTestCommand);

    expect(alwaysFailCommandBus.executeCalls).toBeCalledTimes(1);
    expect(result.isSuccess()).toBeFalsy();
    expect((result as Failure).reason).toStrictEqual(new Error('Mock error'));
  });
});
