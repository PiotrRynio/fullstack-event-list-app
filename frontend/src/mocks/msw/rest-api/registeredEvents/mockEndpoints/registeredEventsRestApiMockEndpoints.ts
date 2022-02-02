import { rest } from 'msw';
import { REGISTRATIONS_PATH, REST_API_URL } from 'constants/restApiPaths';
import { server } from 'mocks/msw/rest-api/server';
import { MockRegistrationsDto } from 'mocks/msw/rest-api/registeredEvents/resposes/MockReqistrationsDtoType';

export function getRegisteredEventsWillReturn(registrationsResponse: MockRegistrationsDto[]) {
  server.use(
    rest.get(`${REST_API_URL}${REGISTRATIONS_PATH}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ registrations: registrationsResponse }));
    }),
  );
}

export function getRegisteredEventsIsLoading() {
  server.use(
    rest.get(`${REST_API_URL}${REGISTRATIONS_PATH}`, (req, res, ctx) => {
      return res(ctx.delay('infinite'));
    }),
  );
}

export function getRegisteredEventsWillReturnFail() {
  server.use(
    rest.get(`${REST_API_URL}${REGISTRATIONS_PATH}`, (req, res, ctx) => {
      return res(ctx.status(404));
    }),
  );
}
