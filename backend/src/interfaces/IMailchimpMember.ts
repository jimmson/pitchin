export interface IMailchimpMember {
  _id: string;
  emailAddress: string;
  subscribed: boolean;
}

export interface IMailchimpTag {
  name: string;
  status: string;
}
