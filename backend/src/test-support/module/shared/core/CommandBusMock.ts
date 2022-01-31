import { CommandResult } from '../../../../shared/Module/core/application/command/CommandResult';
import { CommandBus } from '../../../../shared/Module/core/application/command/CommandBus';
import { CommandHandler } from '../../../../shared/Module/core/application/command/CommandHandler';
import { HasConstructor } from '../../../../shared/Module/common/HasConstructor';
import { Command } from '../../../../shared/Module/core/application/command/Command';

export function CommandBusMock(
  alwaysReturn: CommandResult = CommandResult.success(),
): CommandBus & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      executeCalls(command);
      return alwaysReturn;
    },
    registerHandler<CommandType>(
      commandType: HasConstructor<CommandType>,
      handler: CommandHandler<CommandType>,
    ): void {},
    executeCalls,
  };
}

export function CommandBusResultsMock(results: CommandResult[]): CommandBus & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      const result = results[executeCalls.mock.calls.length];
      executeCalls(command);
      return result;
    },
    registerHandler<CommandType>(
      commandType: HasConstructor<CommandType>,
      handler: CommandHandler<CommandType>,
    ): void {},
    executeCalls,
  };
}
