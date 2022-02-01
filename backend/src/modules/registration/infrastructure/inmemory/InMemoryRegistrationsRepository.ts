import { RegistrationsRepository } from '../../application/RegistrationsRepository';
import { Registration } from '../../domain/Registration';

export class InMemoryRegistrationRepository implements RegistrationsRepository {
  private readonly entities: { [id: string]: Registration } = {};

  async save(registration: Registration): Promise<void> {
    this.entities[registration.registrationId] = registration;
  }

  findAll(): Promise<Registration[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
