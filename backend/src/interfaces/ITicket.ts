export interface ITicket {
  _id?: string;
  name: string;
  phone: Number;
  address: string;
  request: string;
  imageURL: string;
  maxParticipants: Number;
  area: string; // mongodb.ObjectId
  category: string; // mongodb.ObjectId
  owner: string; // mongodb.ObjectId
  organisation: string; // mongodb.ObjectId
  createdAt: Date;
  comments: IComment[];
  status: string;
  notified: boolean;
  activity: IActivity[];
  task: string;
  startDate: Date;
  endDate: Date;
  externalID: Number;
}

export interface IActivity {
  _id?: string;
  time: Date;
  action: string;
  source: ISource;
}

export interface ISource {
  system: Boolean;
  user: string; // mongodb.ObjectId
}

export interface IComment {
  _id?: string;
  time: Date;
  comment: string;
  creator: ICreator;
}

export interface ICreator {
  id?: string; // mongodb.ObjectId
  system: boolean;
}
