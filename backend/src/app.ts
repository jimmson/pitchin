import 'reflect-metadata';

import config from './config';
import Logger from './loaders/logger';
import express from 'express';

const Config = require('./models/Config');
const runjobs = require('./jobs/cron');

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.api.port, () => {
    Logger.info(`server listening on port: ${config.api.port}`);
  });
}
startServer();

// Initialize configuration
async function init() {
  try {
    const config = await new Config();
    await config.init();
    // DEBUG
    // const Zelos = require('./models/Zelos')
    // new Zelos().init();
    runjobs();
  } catch (err) {
    console.error(err);
  }
}

init();
