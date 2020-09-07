import Agenda from 'agenda';

import JobZelosSyncUsers from '../jobs/zelosSyncUsers';
import JobZelosAuthRefresh from '../jobs/zelosAuthRefresh';

const JOB_ZELOS_SYNC_USERS = 'zelos-sync-users';
const JOB_ZELOS_AUTH_REFRESH = 'zelos-auth-refresh';

export default async ({ agenda }: { agenda: Agenda }) => {
  agenda.define(JOB_ZELOS_SYNC_USERS, { priority: 'high' }, JobZelosSyncUsers);
  agenda.every('3 hours', JOB_ZELOS_SYNC_USERS);

  agenda.define(JOB_ZELOS_AUTH_REFRESH, { priority: 'high' }, JobZelosAuthRefresh);
  agenda.every('30 minutes', JOB_ZELOS_AUTH_REFRESH);

  agenda.start();
};
