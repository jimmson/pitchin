import { Container } from 'typedi';
import mongooseLoader from './mongoose';
import expressLoader from './express';
import agendaLoader from './agenda';
import Logger from './logger';
import jobsLoader from './jobs';

import './events';

export default async ({ expressApp }: any) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('db loaded and connected');

  const agenda = agendaLoader({ mongoConnection });
  Logger.info('agenda loaded');

  await jobsLoader({ agenda });
  Logger.info('jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('express loaded');

  Container.set('logger', Logger);
  Container.set('agenda', agenda);
};
