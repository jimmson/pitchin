import { Service } from 'typedi';
import config from '../config';
import Mailchimp from 'mailchimp-api-v3';
import crypto from 'crypto';
import { IMailchimpMember, IMailchimpTag } from '../interfaces/IMailchimpMember';

@Service()
export default class MailChimpService {
  private client: Mailchimp;
  private listID: string;

  static STATUS_SUBSCRIBED = 'subscribed';
  static EMAIL_TYPE_HTML = 'html';
  static TAG_STATUS_ACTIVE = 'active';
  static TAG_WELCOME = 'Welcome Tag';

  constructor() {
    this.client = new Mailchimp(config.mailchimp.apiKey);
    this.listID = config.mailchimp.listID;
  }

  async searchMember(email: string): Promise<IMailchimpMember> {
    const fields = [
      'exact_matches.total_items',
      'exact_matches.members.email_address',
      'exact_matches.members.id',
      'exact_matches.members.status',
      'exact_matches.members.tags.name',
    ];
    const res = await this.client.get(`/search-members?query=${email}&fields=${fields}`, ``);
    if (res.exact_matches.total_items != 1) {
      return null;
    }
    const member = res.exact_matches.members[0];
    return <IMailchimpMember>{
      _id: member.id,
      emailAddress: member.email_address,
      subscribed: member.status === MailChimpService.STATUS_SUBSCRIBED,
    };
  }

  async addOrUpdateMember(email: string): Promise<IMailchimpMember> {
    const subscriberHash = this.subscriberHash(email);
    const res = await this.client.put(`/lists/${this.listID}/members/${subscriberHash}`, {
      email_address: email,
      status_if_new: MailChimpService.STATUS_SUBSCRIBED,
      email_type: MailChimpService.EMAIL_TYPE_HTML,
    });

    return <IMailchimpMember>{
      _id: res.id,
      emailAddress: res.email_address,
      subscribed: res.status === MailChimpService.STATUS_SUBSCRIBED,
    };
  }

  async addMemberTags(email: string, tags: IMailchimpTag[]): Promise<void> {
    const subscriberHash = this.subscriberHash(email);
    const res = await this.client.post(`/lists/${this.listID}/members/${subscriberHash}/tags`, {
      tags: tags,
    });

    console.log(res, {
      tags: tags,
    });

    return;
  }

  private subscriberHash(email: string): string {
    return crypto.createHash('md5').update(email).digest('hex');
  }
}
