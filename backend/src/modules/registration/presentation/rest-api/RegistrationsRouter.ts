import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CommandPublisher } from '../../../../shared/Module/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/Module/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/Module/core/application/query/QueryBus';
import { RegistrationDto } from './response/RegistrationDto';
import { RegisterCommand } from '../../application/RegisterCommand';
import { Registration } from '../../domain/Registration';
import { PostCreateRegistrationRequestBody } from './request/PostCreateRegistrationRequestBody';
import {
  FindAllRegistrationsQuery,
  FindAllRegistrationsQueryResult,
} from '../../application/FindAllRegistrationsQuery';
import { GetAllRegistrationsRequestBody } from './request/GetAllRegistrationsRequestBody';

export function registrationsRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const createRegistrations = async (request: Request, response: Response) => {
    const requestBody: PostCreateRegistrationRequestBody = request.body;

    const { firstName, secondName, userEmail, userEventData } = requestBody;

    const commandResult = await commandPublisher.execute(
      new RegisterCommand({ firstName, secondName, userEmail, userEventData: new Date(userEventData) }),
    );
    return commandResult.process(
      () => response.status(StatusCodes.CREATED).json({ firstName, secondName, userEmail, userEventData }).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getAllRegistrations = async (request: Request, response: Response) => {
    const requestBody: GetAllRegistrationsRequestBody = request.body;

    const queryResult = await queryPublisher.execute<FindAllRegistrationsQueryResult>(new FindAllRegistrationsQuery());
    return response.status(StatusCodes.OK).json({ registrations: queryResult.map(toRegistrationDto) });
  };

  const router = express.Router();
  router.get('', getAllRegistrations);
  router.post('', createRegistrations);
  return router;
}

const toRegistrationDto = ({
  registrationId,
  firstName,
  secondName,
  userEmail,
  userEventData,
}: Registration): RegistrationDto =>
  new RegistrationDto({ registrationId, firstName, secondName, userEmail, userEventData: userEventData.toString() });
