import { Container } from 'typedi';
import Logger from './logger';
import mongooseLoader from './mongoose';
import expressLoader from './express';
import agendaLoader from './agenda';
import zelosLoader from './zelos';
import seedLoader from './seed';
import jobsLoader from './jobs';
import openWeatherMapLoader from './openweatherapi';

import './events';
// import { log } from 'winston';

export default async ({ expressApp }: any) => {
  Container.set('logger', Logger);

  // try {
  const mongoConnection = await mongooseLoader();
  Logger.info('db loaded and connected');

  const zelos = await zelosLoader();
  Logger.info('zelos loaded');
  Container.set('zelos', zelos);

  const openweathermap = await openWeatherMapLoader();
  Logger.info('open weather map loaded');
  Container.set('openweathermap', openweathermap);

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
