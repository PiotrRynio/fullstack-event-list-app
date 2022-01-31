import { Query } from './Query';
import { QueryHandler } from './QueryHandler';
import { HasConstructor } from '../../../common/HasConstructor';

export interface QueryPublisher {
  execute<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType>;
}

export interface QuerySubscriber {
  registerHandler<ResultType = any, QueryType extends Query = Query>(
    queryType: HasConstructor<QueryType>,
    handler: QueryHandler<QueryType, ResultType>,
  ): void;
}

export interface QueryBus extends QueryPublisher, QuerySubscriber {}
