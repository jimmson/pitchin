import { Router } from 'express';
import api from './api';

export default () => {
  const app = Router();

  app.use('/api', api);

  return app;
};
