import { EventSubscriber, On } from 'event-dispatch';
import { Container } from 'typedi';

import Logger from '../loaders/logger';
import MailchimpService from '../services/mailchimp';
import { IUser } from '../interfaces/IUser';

@EventSubscriber()
export class UserEventSubscriber {
  static EVENT_USER_CREATE = 'onUserCreate';

  @On(UserEventSubscriber.EVENT_USER_CREATE)
  async onUserCreate(user: Partial<IUser>) {
    Logger.info(`${UserEventSubscriber.EVENT_USER_CREATE} received for user ${user.email}`);

    const mailchimpService = Container.get(MailchimpService);

    try {
      await mailchimpService.addOrUpdateMember(user.email);
      Logger.info(`add or update on mailchimp for user ${user.email}`);

      await mailchimpService.addMemberTags(user.email, [
        { name: MailchimpService.TAG_WELCOME, status: MailchimpService.TAG_STATUS_ACTIVE },
      ]);
      Logger.info(`add mailchimp tag ${MailchimpService.TAG_WELCOME} for user ${user.email}`);
    } catch (e) {
      Logger.error(e);
    }
  }
}
