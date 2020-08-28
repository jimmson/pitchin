import Agenda from 'agenda';
import config from '../config';

export default ({ mongoConnection }) => {
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
