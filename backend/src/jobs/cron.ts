import { Container } from 'typedi';
import UserService from '../services/users';
import Logger from '../loaders/logger';
import cron from 'node-cron';
import Zelos from '../services/zelos';

const syncUsers = async () => {
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
};

module.exports = function startJobs() {
  cron.schedule('0 1 * * *', syncUsers());
};
