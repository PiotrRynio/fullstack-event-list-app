import { CommandHandler } from './CommandHandler';
import { CommandResult } from './CommandResult';
import { Command } from './Command';
import { HasConstructor } from '../../../common/HasConstructor';

export interface CommandPublisher {
  execute<CommandType extends Command>(command: CommandType): Promise<CommandResult>;
}

export interface CommandSubscriber {
  registerHandler<CommandType>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>): void;
}

export interface CommandBus extends CommandPublisher, CommandSubscriber {}
