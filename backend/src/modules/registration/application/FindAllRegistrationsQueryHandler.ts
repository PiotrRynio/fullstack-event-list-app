import { QueryHandler } from '../../../shared/Module/core/application/query/QueryHandler';
import { RegistrationsRepository } from './RegistrationsRepository';
import { FindAllRegistrationsQuery, FindAllRegistrationsQueryResult } from './FindAllRegistrationsQuery';

export class FindAllRegistrationsQueryHandler
  implements QueryHandler<FindAllRegistrationsQuery, FindAllRegistrationsQueryResult>
{
  constructor(private readonly repository: RegistrationsRepository) {}

  execute(query: FindAllRegistrationsQuery): Promise<FindAllRegistrationsQueryResult> {
    return this.repository.findAll();
  }
}
