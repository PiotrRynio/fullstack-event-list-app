import { StatusCodes } from 'http-status-codes';
import { CommandPublisherMock } from '../../../../test-support/module/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../shared/Module/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/module/shared/presentation/rest-api/TestModuleRestApi';
import { QueryPublisherMock } from '../../../../test-support/module/shared/core/QueryPublisherMock';
import { Registration } from '../../domain/Registration';

describe('Registration REST API', () => {
  const registrationDto = {
    firstName: 'testFirstName',
    secondName: 'testSecondName',
    userEmail: 'testUserEmail@test.com',
    userEventData: new Date(),
  };

  const testRegistration1: Registration = {
    registrationId: 'testId1',
    firstName: 'testFirstName1',
    secondName: 'testSecondName1',
    userEmail: 'testUserEmail@test1.com',
    userEventData: new Date(),
  };

  const testRegistration2: Registration = {
    registrationId: 'testId2',
    firstName: 'testFirstName2',
    secondName: 'testSecondName2',
    userEmail: 'testUserEmail@test2.com',
    userEventData: new Date(),
  };

  it('POST /rest-api/registrations | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(RegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/registrations').send(registrationDto);

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new RegisterCommend(registrationDto));
    expect(status).toBe(StatusCodes.CREATED);
    expect(body).toStrictEqual(registrationDto);
  });

  it('POST /rest-api/registrations | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Email is not correct!')));
    const { agent } = testModuleRestApi(RegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/registrations').send(registrationDto);

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new RegisterCommend(registrationDto));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Email is not correct!' });
  });

  it('GET /rest-api/registrations', async () => {
    //Given
    const queryPublisher = QueryPublisherMock([
      new Registration(testRegistration1),
      new Registration(testRegistration2),
    ]);
    const { agent } = testModuleRestApi(RegistrationsRestApiModule, { queryPublisher });

    //When
    const { body, status } = await agent.get('/rest-api/registrations').send();

    //Then
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindAllRegistrations());
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      items: [testRegistration1, testRegistration2],
    });
  });
});
