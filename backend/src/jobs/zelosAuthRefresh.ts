import { Container } from 'typedi';
import UserService from '../services/users';
import Logger from '../loaders/logger';
import Zelos from '../services/zelos';
import agenda from 'agenda';

// TODO: Error handling.
export default async function (job: agenda.Job, done: (e?: Error) => void): Promise<void> {
  Logger.info(`running zelos refresh tokens job`);

  const zelos: Zelos = Container.get('zelos');

  try {
    await zelos.auth();
    done();
  } catch (err) {
    done(err);
  }
}
