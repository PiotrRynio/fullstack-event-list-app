import { StatusCodes } from 'http-status-codes';
import { CommandPublisherMock } from '../../../../test-support/module/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../shared/Module/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/module/shared/presentation/rest-api/TestModuleRestApi';
import { QueryPublisherMock } from '../../../../test-support/module/shared/core/QueryPublisherMock';
import { Registration } from '../../domain/Registration';
import { RegistrationsRestApiModule } from './RegistrationsRestApiModule';
import { RegisterCommand } from '../../application/RegisterCommand';
import { FindAllRegistrationsQuery } from '../../application/FindAllRegistrationsQuery';
import { PostCreateRegistrationRequestBody } from './request/PostCreateRegistrationRequestBody';

describe('Registration REST API', () => {
  const currentTime1 = new Date();
  const currentTime2 = new Date();

  const postCreateRegistrationRequestBody1: PostCreateRegistrationRequestBody = {
    firstName: 'testFirstName1',
    secondName: 'testSecondName1',
    userEmail: 'testUserEmail1@test.com',
    userEventData: `${currentTime1}`,
  };

  const postCreateRegistrationRequestBody2: PostCreateRegistrationRequestBody = {
    firstName: 'testFirstName2',
    secondName: 'testSecondName2',
    userEmail: 'testUserEmail2@test.com',
    userEventData: `${currentTime2}`,
  };

  const testRegistration1: Registration = {
    registrationId: 'testId1',
    firstName: 'testFirstName1',
    secondName: 'testSecondName1',
    userEmail: 'testUserEmail1@test.com',
    userEventData: currentTime1,
  };

  const testRegistration2: Registration = {
    registrationId: 'testId2',
    firstName: 'testFirstName2',
    secondName: 'testSecondName2',
    userEmail: 'testUserEmail2@test.com',
    userEventData: currentTime2,
  };

  it('POST /rest-api/registrations | when command success', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(RegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/registrations').send(postCreateRegistrationRequestBody1);

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new RegisterCommand(fromRequestBody(postCreateRegistrationRequestBody1)),
    );
    expect(status).toBe(StatusCodes.CREATED);
    expect(body).toStrictEqual(postCreateRegistrationRequestBody1);
  });

  it('POST /rest-api/registrations | when command failure', async () => {
    //Given
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Email is not correct!')));
    const { agent } = testModuleRestApi(RegistrationsRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/registrations').send(postCreateRegistrationRequestBody1);

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(
      new RegisterCommand(fromRequestBody(postCreateRegistrationRequestBody1)),
    );
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
    expect(queryPublisher.executeCalls).toBeCalledWith(new FindAllRegistrationsQuery());
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({
      registrations: [
        { ...postCreateRegistrationRequestBody1, registrationId: 'testId1' },
        { ...postCreateRegistrationRequestBody2, registrationId: 'testId2' },
      ],
    });
  });
});

const fromRequestBody = ({
  firstName,
  secondName,
  userEmail,
  userEventData,
}: PostCreateRegistrationRequestBody): Registration =>
  new Registration({
    registrationId: 'testId',
    firstName,
    secondName,
    userEmail,
    userEventData: new Date(userEventData),
  });
