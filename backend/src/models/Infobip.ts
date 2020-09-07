import axios from 'axios';
import config from '../config';

class Infobip {
  apiKey: any;
  axiosConfig: any;
  baseUrl: any;
  sender: any;

  constructor() {
    this.baseUrl = config.infobip.baseUrl;
    this.apiKey = config.infobip.apiKey;
  }

  async init() {
    this.sender = config.infobip.sender;
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
      from: this.sender,
      destinations: [
        {
          to: number,
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
