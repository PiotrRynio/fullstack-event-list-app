import { config } from 'dotenv';
import { Express } from 'express';
import { restApiExpressServer } from './rest-api/Server';

config();

export type App = { restApi: Express };

export const App = async (): Promise<App> => {
  const restApi = restApiExpressServer();

  return { restApi };
};
