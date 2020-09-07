import axios from 'axios';
import config from '../config';

class Mailgun {
  headers: any;
  params: any;

  constructor(email: any) {
    const key = Buffer.from(`api:${config.mailgun.apiKey}`)
      .toString('base64')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      .toString('utf8');
    this.headers = {
      Authorization: `Basic ${key}`,
    };
    this.params = {
      from: `${config.app.name} <${config.mailgun.from}>`,
      to: email,
    };
  }

  async send(subject: any, text: any) {
    this.params.subject = subject;
    this.params.text = text;
    axios.post(`${config.mailgun.baseURL}/${config.mailgun.domain}/messages`, null, {
      params: this.params,
      headers: this.headers,
    });
  }
}

module.exports = Mailgun;
