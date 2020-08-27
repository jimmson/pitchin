import { Router } from 'express';
const api = require('./api');

export default () => {
  const app = Router();

  app.use('/api', api);

  return app;
};
