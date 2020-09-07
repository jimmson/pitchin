import { Container } from 'typedi';

import UserService from '../services/users';
import log from '../loaders/logger';
import Zelos from '../services/zelos';
import agenda from 'agenda';

// TODO: Error handling.
export default async function (job: agenda.Job, done: (e?: Error) => void): Promise<void> {
  log.info(`running zelos user sync job`);

  const userService = Container.get(UserService);
  const zelos: Zelos = Container.get('zelos');

  try {
    for await (const user of zelos.streamUsers()) {
      const result = await userService.getUserByField({ email: user.email });
      if (result) {
        log.info(`user ${user.email} already exists`);
        continue;
      }

      log.info(`creating user ${user.email}`);
      await userService.create(user.email, user.first_name, user.last_name, '');
    }
  } catch (err) {
    log.error(err);
  }

  done();
}
