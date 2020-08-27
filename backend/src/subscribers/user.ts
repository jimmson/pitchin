import { EventSubscriber, On } from 'event-dispatch';
import { Container } from 'typedi';

import Logger from '../loaders/logger';
import MailchimpService from '../services/mailchimp';
import { IUser } from '../interfaces/IUser';

@EventSubscriber()
// @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
export class UserEventSubscriber {
  static EVENT_USER_CREATE = 'onUserCreate';

  @On(UserEventSubscriber.EVENT_USER_CREATE)
  // @ts-expect-error ts-migrate(1219) FIXME: Experimental support for decorators is a feature t... Remove this comment to see the full error message
  async onUserCreate(user: Partial<IUser>) {
    Logger.info(`${UserEventSubscriber.EVENT_USER_CREATE} received for user ${user.email}`);

    const mailchimpService = Container.get(MailchimpService);

    try {
      // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
      await mailchimpService.addOrUpdateMember(user.email);
      Logger.info(`add or update on mailchimp for user ${user.email}`);

      // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
      await mailchimpService.addMemberTags(user.email, [
        { name: MailchimpService.TAG_WELCOME, status: MailchimpService.TAG_STATUS_ACTIVE },
      ]);
      Logger.info(`add mailchimp tag ${MailchimpService.TAG_WELCOME} for user ${user.email}`);
    } catch (e) {
      Logger.error(e);
    }
  }
}
