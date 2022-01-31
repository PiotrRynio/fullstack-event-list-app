import { CommandResult } from '../../../../shared/Module/core/application/command/CommandResult';
import { CommandPublisher } from '../../../../shared/Module/core/application/command/CommandBus';
import { Command } from '../../../../shared/Module/core/application/command/Command';

export function CommandPublisherMock(
  alwaysReturn: CommandResult = CommandResult.success(),
): CommandPublisher & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      executeCalls(command);
      return alwaysReturn;
    },
    executeCalls,
  };
}
