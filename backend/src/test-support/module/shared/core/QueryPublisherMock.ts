import { QueryPublisher } from '../../../../shared/Module/core/application/query/QueryBus';
import { Query } from '../../../../shared/Module/core/application/query/Query';

export function QueryPublisherMock(alwaysReturn: any = undefined): QueryPublisher & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType> {
      executeCalls(query);
      return alwaysReturn;
    },
    executeCalls,
  };
}
