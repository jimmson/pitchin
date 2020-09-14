import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  // Connect to DB
  const connection = await mongoose.connect(`${config.db.scheme}://${config.db.host}?retryWrites=true&w=majority`, {
    user: config.db.user,
    pass: config.db.password,
    dbName: config.db.db,
    authSource: config.db.authSource,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  return connection.connection.db;
};
