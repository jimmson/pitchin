import Agenda from 'agenda';
import { Db } from 'mongodb';

import config from '../config';

export default ({ mongoConnection }: { mongoConnection: Db }) => {
  return new Agenda(
    {
      mongo: mongoConnection,
      db: { collection: config.agenda.dbCollection },
    },
    (err, res) => {
      if (err) {
        throw err;
      }
    },
  );
};
