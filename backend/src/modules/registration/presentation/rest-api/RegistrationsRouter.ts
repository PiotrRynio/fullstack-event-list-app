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

    const { firstName, lastName, userEmail, userEventDate } = requestBody;

    const commandResult = await commandPublisher.execute(
      new RegisterCommand({ firstName, lastName: lastName, userEmail, userEventDate: new Date(userEventDate) }),
    );
    return commandResult.process(
      (state: Registration[]) => {
        const responseBody = {
          registrations: state.map(
            ({ registrationId, firstName, lastName, userEmail, userEventDate }): RegistrationDto => ({
              registrationId,
              firstName,
              lastName,
              userEmail,
              userEventDate: userEventDate.toISOString(),
            }),
          ),
        };
        return response.status(StatusCodes.CREATED).json(responseBody);
      },
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
  lastName,
  userEmail,
  userEventDate,
}: Registration): RegistrationDto =>
  new RegistrationDto({
    registrationId,
    firstName,
    lastName: lastName,
    userEmail,
    userEventDate: userEventDate.toISOString(),
  });
