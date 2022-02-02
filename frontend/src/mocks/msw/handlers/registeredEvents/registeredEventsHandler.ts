import { rest } from 'msw';
import { REGISTRATIONS_PATH } from '../../../../constants/restApiPaths';
import { MockRegistrationsDto, registrationsResponse } from './registeredEventsResponse';

const getRegisteredEvents = rest.get(
  `${process.env.REST_API_URL}/${REGISTRATIONS_PATH}`,
  (request, response, restContext) => {
    return response(restContext.status(200), restContext.json(registrationsResponse));
  },
);

const postRegisteredEvent = rest.post(
  `${process.env.REST_API_URL}/${REGISTRATIONS_PATH}`,
  (request, response, restContext) => {
    const { registrations } = registrationsResponse;
    const registrationEvent = request.body as MockRegistrationsDto;
    registrations.push(registrationEvent);
    return response(restContext.status(200), restContext.json(registrationsResponse));
  },
);

export const registeredEventsHandlers = [getRegisteredEvents, postRegisteredEvent];
