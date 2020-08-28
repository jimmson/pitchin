import { Container } from 'typedi';
import UserService from '../services/users';
import Logger from '../loaders/logger';
import Zelos from '../services/zelos';
import agenda from 'agenda';

// TODO: Error handling.
export default async function (job: agenda.Job, done: (e?: Error) => void): Promise<void> {
  Logger.info(`running zelos user sync job`);

  const userService = Container.get(UserService);
  const zelos = new Zelos();
  await zelos.init();
  const users = await zelos.getUsers();

  for (let u of users) {
    u = u.data;
    const result = await userService.getUserByField({ email: u.email });
    if (result) {
      Logger.info(`user ${u.email} already exists`);
      continue;
    }

    Logger.info(`creating user ${u.email}`);
    await userService.create(u.email, u.first_name, u.last_name, '');
  }

  done();
}
