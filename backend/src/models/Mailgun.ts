// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('axios');

class Mailgun {
  headers: any;
  params: any;
  constructor(email: any) {
    const key = Buffer.from(`api:${process.env.MAILGUN_API_KEY}`)
      .toString('base64')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      .toString('utf8');
    this.headers = {
      Authorization: `Basic ${key}`,
    };
    this.params = {
      from: `${process.env.WORKSPACE_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
      to: email,
    };
  }
  async send(subject: any, text: any) {
    this.params.subject = subject;
    this.params.text = text;
    axios.post(`${process.env.MAILGUN_BASE_URL}/${process.env.MAILGUN_DOMAIN}/messages`, null, {
      params: this.params,
      headers: this.headers,
    });
  }
}

module.exports = Mailgun;
