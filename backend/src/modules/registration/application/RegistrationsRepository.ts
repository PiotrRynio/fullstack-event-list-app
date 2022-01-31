import { Registration } from '../domain/Registration';

export interface RegistrationsRepository {
  save(registration: Registration): Promise<void>;

  findAll(): Promise<Comment[]>;
}
