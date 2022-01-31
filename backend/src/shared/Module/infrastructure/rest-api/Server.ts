import express, { Express } from 'express';
import { ModuleRestApi } from '../../presentation/rest-api/ModuleRestApi';
import cors from 'cors';

export function restApiExpressServer(modules: ModuleRestApi[] = []): Express {
  const server = express();
  server.use(express.json());
  server.use(cors());

  modules.forEach((restApiModule) => {
    server.use('/rest-api' + restApiModule.path, restApiModule.router);
  });

  process.on('uncaughtException', function (err) {
    console.error('[RestApi] Global exception handler (uncaughtException):', err.message);
  });

  process.on('unhandledRejection', function (reason: any, promise: Promise<any>) {
    console.error('[RestApi] Global exception handler (unhandledRejection):', reason.message || reason);
  });

  return server;
}
