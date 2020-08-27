// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('axios');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Config'.
const Config = require(`./Config`);

class Infobip {
  apiKey: any;
  axiosConfig: any;
  baseUrl: any;
  constructor() {
    this.baseUrl = process.env.INFOBIP_BASE_URL;
    this.apiKey = process.env.INFOBIP_API_KEY;
  }
  async init() {
    const config = new Config();
    const settings = await config.get('sms');
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'sender' does not exist on type 'Infobip'... Remove this comment to see the full error message
    this.sender = settings.fromName;
    this.axiosConfig = {
      headers: {
        Authorization: `App ${this.apiKey}`,
      },
    };
  }

  async send(number: any, text: any) {
    await this.init();
    const req = {};
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'messages' does not exist on type '{}'.
    req.messages = [];
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'messages' does not exist on type '{}'.
    req.messages.push({
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'sender' does not exist on type 'Infobip'... Remove this comment to see the full error message
      from: this.sender,
      destinations: [
        {
          to: process.env.PHONE_PREFIX + number,
        },
      ],
      text: text,
    });
    try {
      await axios.post(`${this.baseUrl}`, req, this.axiosConfig);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Infobip;
