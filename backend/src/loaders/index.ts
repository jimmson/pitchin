import { Container } from 'typedi';
import mongooseLoader from './mongoose';
import expressLoader from './express';
import agendaLoader from './agenda';
import zelosLoader from './zelos';
import Logger from './logger';
import jobsLoader from './jobs';
import Zelos from '../services/zelos';

import './events';

export default async ({ expressApp }: any) => {
  Container.set('logger', Logger);

  const zelos = await zelosLoader();
  Logger.info('zelos loaded');
  Container.set('zelos', zelos);

  const mongoConnection = await mongooseLoader();
  Logger.info('db loaded and connected');

  const agenda = agendaLoader({ mongoConnection });
  Logger.info('agenda loaded');

  await jobsLoader({ agenda });
  Logger.info('jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('express loaded');
};
