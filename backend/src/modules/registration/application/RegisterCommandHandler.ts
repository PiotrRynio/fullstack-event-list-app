import { CommandResult } from '../../../shared/Module/core/application/command/CommandResult';
import { CommandHandler } from '../../../shared/Module/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../shared/Module/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../shared/Module/core/CurrentTimeProvider';
import { RegisterCommand } from './RegisterCommand';
import { EntityIdGenerator } from '../../../shared/Module/core/application/EntityIdGenerator';
import { RegistrationsRepository } from './RegistrationsRepository';
import { registerNewRecord } from '../domain/Registration';
import { EmailAddress } from '../domain/valueObjects/EmailAddress';
import { RegistrationId } from '../domain/valueObjects/RegistrationId';
import { EventDate } from '../domain/valueObjects/EventDate';
import { LastName } from '../domain/valueObjects/LastName';
import { FirstName } from '../domain/valueObjects/FirstName';

export class RegisterCommandHandler implements CommandHandler<RegisterCommand> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: RegistrationsRepository,
    private readonly entityIdGenerator: EntityIdGenerator,
  ) {}

  async execute(command: RegisterCommand): Promise<CommandResult> {
    const { state, events } = registerNewRecord(
      this.currentTimeProvider(),
      new RegistrationId(this.entityIdGenerator.generate()),
      {
        firstName: new FirstName(command.firstName),
        lastName: new LastName(command.lastName),
        userEmail: new EmailAddress(command.userEmail),
        userEventData: new EventDate(command.userEventData),
      },
    );

    await this.repository.save(state);
    const allRegistrations = await this.repository.findAll();
    this.eventPublisher.publishAll(events);
    return CommandResult.success(allRegistrations);
  }
}
