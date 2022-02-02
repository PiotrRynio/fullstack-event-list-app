import { rest } from 'msw';
import { REST_API_URL, REGISTRATIONS_PATH } from 'constants/restApiPaths';
import { registrationsResponse } from 'mocks/msw/rest-api/registeredEvents/resposes/registeredEventsResponse';
import { MockRegistrationsDto } from 'mocks/msw/rest-api/registeredEvents/resposes/MockReqistrationsDtoType';

const getRegisteredEvents = rest.get(`${REST_API_URL}${REGISTRATIONS_PATH}`, (request, response, restContext) => {
  return response(restContext.status(200), restContext.json(registrationsResponse));
});

const postRegisteredEvent = rest.post(`${REST_API_URL}${REGISTRATIONS_PATH}`, (request, response, restContext) => {
  const { registrations } = registrationsResponse;
  const registrationEvent = request.body as MockRegistrationsDto;
  registrations.push(registrationEvent);
  return response(restContext.status(200), restContext.json(registrationsResponse));
});

export const registeredEventsHandlers = [getRegisteredEvents, postRegisteredEvent];
