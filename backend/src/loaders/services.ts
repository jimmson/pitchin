import { Container } from 'typedi';
import Logger from './logger';
import zelosLoader from './zelos';
import openWeatherMapLoader from './openweatherapi';
import organisationLoader from './organisation';

export default async (): Promise<void> => {
  const organisation = await organisationLoader();
  Logger.info('organisation service loaded');
  Container.set('organisation', organisation);

  const zelos = await zelosLoader();
  Logger.info('zelos loaded');
  Container.set('zelos', zelos);

  const openweathermap = await openWeatherMapLoader();
  Logger.info('open weather map loaded');
  Container.set('openweathermap', openweathermap);
};
