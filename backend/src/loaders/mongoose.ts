import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  // Connect to DB
  const connection = await mongoose.connect(`mongodb://${config.db.host}:27017/${config.db.db}`, {
    user: config.db.user,
    pass: config.db.password,
    authSource: config.db.authSource,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: false,
  });
  return connection.connection.db;
};
