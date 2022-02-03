import { InMemoryQueryBus } from './InMemoryQueryBus';
import { QueryBus } from '../../../../core/application/query/QueryBus';

describe('InMemoryQueryBus', () => {
  const firstTestName = 'Jan Kowalski';
  const lastTestName = 'Jan Nowak';
  const testId = 'SampleId';

  it('query should returns response from registered handler', async () => {
    //Given
    const queryReturnValue = [new testObject({ name: firstTestName }), new testObject({ name: lastTestName })];
    const queryBus: QueryBus = new InMemoryQueryBus().withHandler<testObject[], FindTestObjectByGroup>(
      FindTestObjectByGroup,
      queryHandlerStubReturning<testObject[], FindTestObjectByGroup>(queryReturnValue),
    );

    //When
    const findTestObjectByGroup = new FindTestObjectByGroup({ groupId: testId });
    const queryResult = await queryBus.execute<testObject[]>(findTestObjectByGroup);

    //Then
    expect(queryResult).toStrictEqual(queryReturnValue);
  });

  it('when try to register another query handler, then registering should fail', async () => {
    //Given
    const queryReturnValue = [new testObject({ name: firstTestName }), new testObject({ name: lastTestName })];
    const queryBus: QueryBus = new InMemoryQueryBus().withHandler<testObject[], FindTestObjectByGroup>(
      FindTestObjectByGroup,
      queryHandlerStubReturning<testObject[], FindTestObjectByGroup>(queryReturnValue),
    );

    //When
    const registerHandler = () =>
      queryBus.registerHandler<testObject[], FindTestObjectByGroup>(
        FindTestObjectByGroup,
        queryHandlerStubReturning<testObject[], FindTestObjectByGroup>(queryReturnValue),
      );

    //Then
    await expect(registerHandler).toThrowError(
      'The query handler for the "FindTestObjectByGroup" query was already registered!',
    );
  });

  it('when handler is not registered, then query should fail', async () => {
    //Given
    const queryBus: QueryBus = new InMemoryQueryBus();

    //When
    const findTestObjectByGroup = new FindTestObjectByGroup({ groupId: testId });
    const executeQuery = () => queryBus.execute<testObject[]>(findTestObjectByGroup);

    //Then
    await expect(executeQuery).rejects.toThrowError(
      'The query handler for the "FindTestObjectByGroup" query was not found!',
    );
  });
});

function queryHandlerStubReturning<ResponseType, QueryType>(responseValue: ResponseType) {
  return {
    execute(query: QueryType): Promise<ResponseType> {
      return Promise.resolve(responseValue);
    },
  };
}

class FindTestObjectByGroup {
  readonly groupId: string;

  constructor(props: { groupId: string }) {
    this.groupId = props.groupId;
  }
}

class testObject {
  readonly name: string;

  constructor(props: { name: string }) {
    this.name = props.name;
  }
}
