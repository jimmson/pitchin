import 'reflect-metadata';

import config from './config';
import Logger from './loaders/logger';
import express from 'express';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.api.port, () => {
    Logger.info(`server listening on port: ${config.api.port}`);
  });
}

startServer();
