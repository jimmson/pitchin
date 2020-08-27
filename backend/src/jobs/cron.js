import { Container } from 'typedi';
import MailchimpService from '../services/mailchimp';
import UserService from '../services/users';
import Logger from '../loaders/logger';

import { EventDispatcher } from 'event-dispatch';
import { UserEventSubscriber } from '../subscribers/user';

const cron = require('node-cron');
const appRoot = require('app-root-path');
import Zelos from '../services/zelos';
var Mailchimp = require('mailchimp-api-v3');
var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

const syncUsers = async () => {
  const userService = Container.get(UserService);
  const zelos = new Zelos();
  await zelos.init();
  const users = await zelos.getUsers();
  users.forEach(async (u) => {
    u = u.data;
    const result = await userService.getUserByField({ email: u.email });
    if (result) {
      Logger.info(`user ${u.email} already exists`);
      return;
    }

    Logger.info(`creating user ${u.email}`);
    await userService.create(u.email, u.first_name, u.last_name, '');
  });
};

module.exports = function startJobs() {
  cron.schedule('0 1 * * *', syncUsers());
};
