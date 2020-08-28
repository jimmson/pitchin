import config from '../config';
import JobSyncZelosUsers from '../jobs/syncZelosUsers';
import Agenda from 'agenda';

const JOB_SYNC_ZELOS_USERS = 'sync-zelos-users';

export default async ({ agenda }: { agenda: Agenda }) => {
  agenda.define(JOB_SYNC_ZELOS_USERS, { priority: 'high' }, await JobSyncZelosUsers);
  agenda.every('3 hours', JOB_SYNC_ZELOS_USERS);

  agenda.start();
};
