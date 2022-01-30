import express, { Express } from 'express';
import cors from 'cors';

export function restApiExpressServer(): Express {
  const server = express();
  server.use(express.json());
  server.use(cors());

  process.on('uncaughtException', function (err) {
    console.error('[RestApi] Global exception handler (uncaughtException):', err.message);
  });

  process.on('unhandledRejection', function (reason: any, promise: Promise<any>) {
    console.error('[RestApi] Global exception handler (unhandledRejection):', reason.message || reason);
  });

  return server;
}
