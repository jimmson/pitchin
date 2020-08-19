const axios = require("axios");
const Config = require("./Config");
const moment = require("moment");

const cfg = new Config();

const dateFormat = "YYYY-MM-DDTHH:mm:ssZZ";

class Zelos {
  constructor() {
    this.url = `https://${process.env.ZELOS_WORKSPACE}.zelos.space`;
    this.credentials = {
      email: process.env.ZELOS_USER_EMAIL,
      password: process.env.ZELOS_USER_PASSWORD,
    };
    this.tokens = {};
    this.axiosConfig = {
      headers: {},
    };
  }
  async init() {
    const config = new Config();
    const configModel = await config.get();
    const settings = await config.get("zelos", true);
    if (settings.tokens) {
      this.tokens = settings.tokens;
      if (isTokenValid(this.tokens.access.expired_at)) {
        console.log(`[d] Zelos: Access token is valid`);
      } else if (isTokenValid(this.tokens.refresh.expired_at)) {
        console.log(`[d] Zelos: Requesting new access token`);
        this.tokens = await this.getAccessToken();
        saveTokens(configModel, this.tokens);
      } else {
        console.log(`[d] Zelos: Re-authenticating`);
        this.tokens = await this.login();
        saveTokens(configModel, this.tokens);
      }
    } else {
      console.log(`[d] Zelos: no tokens found, initializing`);
      this.tokens = await this.login();
      saveTokens(configModel, this.tokens);
    }

    this.axiosConfig.headers = {
      Authorization: `Bearer ${this.tokens.access.token}`,
    };
    const status = await axios.get(`${this.url}/api/status`);
    console.log(`[i] Authenticated to "${status.data.event_name}"`);
  }

  async login() {
    const res = await axios.post(
      "https://app.zelos.space/api/auth",
      this.credentials
    );
    const tokens = res.data.data;
    return tokens;
  }
  async getAccessToken() {
    try {
      const res = await axios.put(
        "https://app.zelos.space/api/auth",
        { refresh_token: this.tokens.refresh.token },
        this.axiosConfig
      );
      const tokens = res.data.data;
      return tokens;
    } catch (err) {
      const tokens = this.login();
      return tokens;
    }
  }
  async getTasks() {
    const request = {
      headers: this.axiosConfig.headers,
    };
    const res = await axios.get(`${this.url}/api/task`, request);
    this.tasks = res.data.data;
    console.log(`[i] Found ${this.tasks.length} tasks`);
  }
  async getUsers() {
    try {
      const request = {
        headers: this.axiosConfig.headers,
      };
      let users = [];
      let page = 1;
      let last = 1;
      while (page <= last) {
        console.log(`[i] Getting page ${page} of users`);
        const res = await axios.get(`${this.url}/api/user`, request);
        users.push(...res.data.data);
        last = res.data.meta.last_page || last;
        page++;
      }
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async getGroups() {
    try {
      const request = {
        headers: this.axiosConfig.headers,
      };
      const res = await axios.get(`${this.url}/api/group`, request);
      this.groups = res.data.data;
      console.log(`[i] Loaded ${this.groups.length} groups`);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findGroup(name) {
    let url = `${this.url}/api/group?name=${name}`;
    url = encodeURI(url);
    const request = {
      headers: this.axiosConfig.headers,
    };
    const res = await axios.get(url, request);
    if (res.data.data == "") {
      return null;
    } else {
      const group = res.data.data;
      return group[0].data.id;
    }
  }
  async newGroup(name, desc, closed = false, secret = false, noScore = true) {
    const config = {
      headers: this.axiosConfig.headers,
    };
    const data = {
      name: name,
      description: desc,
      closed: closed,
      secret: secret,
      hide_from_scoreboards: noScore,
    };
    try {
      const res = await axios.post(`${this.url}/api/group`, data, config);
      return res.data.data.id;
    } catch (err) {
      console.log(err.response);
      if ((err.response.status = 403)) {
        return null;
      }
    }
  }

  async newTask(details) {
    let name = "";
    const description = details.publicFields.request;
    if (description.length > 255) {
      name = `${description.substring(0, 252)}...`;
    } else {
      name = description;
    }
    // parse instructions
    const instructions = [];
    Object.keys(details.privateFields).forEach((item) => {
      if (item === "phone" || item === "address" || item === "name") {
        instructions.push(
          `${item.capitalize()}: ${details.privateFields[item]}`
        );
      } else {
        instructions.push("\n" + details.privateFields[item]);
      }
    });
    // Format dates
    const executionEndDate = details.publicFields.executionEndDate
      ? moment(details.publicFields.executionEndDate).format(dateFormat)
      : null;
    const executionStartDate = details.publicFields.executionStartDate
      ? moment(details.publicFields.executionStartDate).format(dateFormat)
      : null;
    // parse settings
    const defSetting = await cfg.get("zelos");
    const confirmAssignment = details.settings.confirmAssignment
      ? details.settings.confirmAssignment
      : defSetting.confirmAssignment;
    const confirmCompletion = details.settings.confirmCompletion
      ? details.settings.confirmCompletion
      : defSetting.confirmCompletion;
    // prepare request body
    const body = {
      type: "regular",
      name: name,
      description: description,
      instructions: instructions.join("\n"),
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
    const axiosCfg = {
      headers: this.axiosConfig.headers,
    };
    try {
      const res = await axios.post(
        `${this.url}/api/task/regular`,
        body,
        axiosCfg
      );
      const taskUrl = this.url + "/tasks/" + res.data.data.id;
      console.log(`[i] Created ${taskUrl}`);
      return taskUrl;
    } catch (err) {
      console.error(`[!] Failed to create task: ${err.response}`);
      throw err;
    }
  }
}

function isTokenValid(exp) {
  now = Math.floor(new Date().getTime() / 1000);
  if (now > exp) {
    return false;
  } else {
    return true;
  }
}

function saveTokens(config, tokens) {
  config.zelos.tokens = tokens;
  config.save();
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

module.exports = Zelos;
