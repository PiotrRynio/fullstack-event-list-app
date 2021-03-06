import { CommandBus } from '../../../../core/application/command/CommandBus';
import { CommandHandler } from '../../../../core/application/command/CommandHandler';
import { Command } from '../../../../core/application/command/Command';
import { CommandResult } from '../../../../core/application/command/CommandResult';
import { HasConstructor } from '../../../../common/HasConstructor';

export class InMemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandTypeName, CommandHandler>();

  execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
    const commandTypeName: CommandTypeName = Object.getPrototypeOf(command).constructor.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (!commandHandler) {
      return Promise.reject(new CommandHandlerNotFoundException(commandTypeName));
    }
    return commandHandler.execute(command).catch((error) => CommandResult.failureDueTo(error));
  }

  registerHandler<CommandType extends Command>(
    commandType: HasConstructor<CommandType>,
    handler: CommandHandler<CommandType>,
  ): void {
    const commandTypeName: CommandTypeName = commandType.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (commandHandler) {
      throw new CommandHandlerAlreadyRegisteredException(commandTypeName);
    }
    this.handlers.set(commandTypeName, handler);
  }
}

type CommandTypeName = string;

class CommandHandlerNotFoundException extends Error {
  constructor(commandName: string) {
    super(`The command handler for the "${commandName}" command was not found!`);
  }
}

class CommandHandlerAlreadyRegisteredException extends Error {
  constructor(commandName: string) {
    super(`The command handler for the "${commandName}" command was already registered!`);
  }
}
