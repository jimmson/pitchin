import Stream from 'stream';
import { Service, Inject } from 'typedi';
import axios, { AxiosRequestConfig } from 'axios';
import moment, { Moment } from 'moment';

import config from '../config';
import log from '../loaders/logger';

@Service()
export default class Zelos {
  private static DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZZ';
  private static DOMAIN = 'zelos.space';
  private static AUTH_URL = 'https://app.zelos.space/api/auth';

  private url: string;
  private email: string;
  private password: string;

  private aToken: string = '';
  private aTokenExpiresAt: Moment = moment(0);
  private rToken: string = '';
  private rTokenExpiresAt: Moment = moment(0);

  constructor() {
    this.url = `https://${config.zelos.subdomain}.${Zelos.DOMAIN}`;
    this.email = config.zelos.email;
    this.password = config.zelos.password;
  }

  async auth() {
    if (this.rTokenExpiresAt.isBefore(moment().subtract(10, 'h'))) {
      return this.login();
    }
    if (this.aTokenExpiresAt.isBefore(moment().subtract(10, 'm'))) {
      return this.refresh();
    }
  }

  private authHeaders(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.aToken}`,
      },
    };
  }

  private async login(): Promise<void> {
    try {
      const res = await axios.post(Zelos.AUTH_URL, {
        email: this.email,
        password: this.password,
      });
      this.setTokens(res.data.data);
    } catch (err) {
      log.error(err);
    }
  }

  private async refresh(): Promise<void> {
    try {
      const res = await axios.put(
        Zelos.AUTH_URL,
        {
          refresh_token: this.rToken,
        },
        this.authHeaders(),
      );
      this.setTokens(res.data.data);
    } catch (err) {
      log.error(err);
    }
  }

  private setTokens(data: any): void {
    this.rToken = data.refresh.token;
    this.aToken = data.access.token;

    this.rTokenExpiresAt = moment.unix(data.refresh.expired_at);
    this.aTokenExpiresAt = moment.unix(data.access.expired_at);
  }

  async findGroup(name: any) {
    let url = `${this.url}/api/group?name=${name}`;
    url = encodeURI(url);
    const res = await axios.get(url, this.authHeaders());
    if (res.data.data == '') {
      return null;
    } else {
      const group = res.data.data;
      return group[0].data.id;
    }
  }

  async newGroup(name: any, desc: any, closed = false, secret = false, noScore = true) {
    const data = {
      name: name,
      description: desc,
      closed: closed,
      secret: secret,
      hide_from_scoreboards: noScore,
    };
    try {
      const res = await axios.post(`${this.url}/api/group`, data, this.authHeaders());
      return res.data.data.id;
    } catch (err) {
      console.log(err.response);
      if ((err.response.status = 403)) {
        return null;
      }
    }
  }

  async newTask(details: any) {
    let name = '';
    const description = details.publicFields.request;
    if (description.length > 255) {
      name = `${description.substring(0, 252)}...`;
    } else {
      name = description;
    }
    // parse instructions
    const instructions: any = [];
    Object.keys(details.privateFields).forEach((item) => {
      if (item === 'phone' || item === 'address' || item === 'name') {
        instructions.push(`${capitalize(item)}: ${details.privateFields[item]}`);
      } else {
        instructions.push('\n' + details.privateFields[item]);
      }
    });
    // Format dates
    const executionEndDate = details.publicFields.executionEndDate
      ? moment(details.publicFields.executionEndDate).format(Zelos.DATE_FORMAT)
      : null;
    const executionStartDate = details.publicFields.executionStartDate
      ? moment(details.publicFields.executionStartDate).format(Zelos.DATE_FORMAT)
      : null;
    // parse settings
    const defSetting = await cfg.get('zelos');
    const confirmAssignment = details.settings.confirmAssignment
      ? details.settings.confirmAssignment
      : defSetting.confirmAssignment;
    const confirmCompletion = details.settings.confirmCompletion
      ? details.settings.confirmCompletion
      : defSetting.confirmCompletion;
    // prepare request body
    const body = {
      type: 'regular',
      name: name,
      description: description,
      instructions: instructions.join('\n'),
      execution_start_date: executionStartDate,
      execution_end_date: executionEndDate,
      points: 1,
      publish_at: null,
      active_until: null,
      images: [],
      assignment_approve_needed: Boolean(confirmAssignment),
      completion_approve_needed: Boolean(confirmCompletion),
      max_participants_amount: details.publicFields.maxParticipantsAmount,
      groups: [details.settings.group],
      location_id: null,
      user_ids: [],
    };
    try {
      const res = await axios.post(`${this.url}/api/task/regular`, body, this.authHeaders());
      const taskUrl = this.url + '/tasks/' + res.data.data.id;
      console.log(`[i] Created ${taskUrl}`);
      return taskUrl;
    } catch (err) {
      console.error(`[!] Failed to create task: ${err.response}`);
      throw err;
    }
  }

  private async *getUsersGenerator() {
    let _page = 1;
    let _last = 1;
    while (_page <= _last) {
      try {
        console.log(`[i] Getting page ${_page} of users`, _last);
        const res = await axios.get(`${this.url}/api/user?page=${_page}`, this.authHeaders());
        ({ last_page: _last, current_page: _page } = res.data.meta);
        for (let u of res.data.data) {
          yield u.data;
        }
        _page++;
      } catch (err) {
        throw err;
      }
    }
  }

  streamUsers(): Stream.Readable {
    return Stream.Readable.from(this.getUsersGenerator());
  }
}

function capitalize(s: any) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
