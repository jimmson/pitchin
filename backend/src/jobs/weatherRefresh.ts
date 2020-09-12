import { Container } from 'typedi';
import UserService from '../services/users';
import Logger from '../loaders/logger';
import OpenWeatherMap from '../services/openweather';
import agenda from 'agenda';

// TODO: Error handling.
export default async function (job: agenda.Job, done: (e?: Error) => void): Promise<void> {
  Logger.info(`running open weather refresh job`);

  const openweathermap: OpenWeatherMap = Container.get('openweathermap');
  try {
    await openweathermap.update();
    done();
  } catch (err) {
    done(err);
  }
}
