import mongooseLoader from './mongoose';
import expressLoader from './express';
import Logger from './logger';

import './events';

export default async ({ expressApp }: any) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('db loaded and connected');

  await expressLoader({ app: expressApp });
  Logger.info('express loaded');
};
