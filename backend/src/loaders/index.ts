import { Container } from 'typedi';
import Logger from './logger';
import mongooseLoader from './mongoose';
import expressLoader from './express';
import agendaLoader from './agenda';
import servicesLoader from './services';
import seedLoader from './seed';
import jobsLoader from './jobs';
import config from '../config';
import './events';

export default async ({ expressApp }: any) => {
  Container.set('logger', Logger);
  Logger.info(`env: ${config.env}`);

  // try {
  const mongoConnection = await mongooseLoader();
  Logger.info('db loaded and connected');

  await servicesLoader();
  Logger.info('services loaded');

  const seeded = await seedLoader();
  Logger.info(`database was ${seeded ? 'seeded' : 'not seeded'}`);

  const agenda = agendaLoader({ mongoConnection });
  Logger.info('agenda loaded');

  await jobsLoader({ agenda });
  Logger.info('jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('express loaded');
  // } catch (err) {
  //   // TODO():Fatal?
  //   Logger.error(err);
  // }
};
