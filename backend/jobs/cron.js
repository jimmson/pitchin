const cron = require("node-cron");
const appRoot = require("app-root-path");
const User = require(appRoot + "/models/User");
const Zelos = require(appRoot + "/models/Zelos");
var Mailchimp = require("mailchimp-api-v3");
var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

const syncUsers = async () => {
  const user = new User();
  const zelos = new Zelos();
  await zelos.init();
  const users = await zelos.getUsers();

  users.forEach(async (u) => {
    u = u.data;
    const result = await user.getUserByField({ email: u.email });
    if (!result) {
      await user.syncZelosUser(u.email, u.first_name, u.last_name);

      await mailchimp.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
        email_address: u.email,
        status: "subscribed",
        tags: ["Welcome Mail"],
      });
    }
  });
};

module.exports = function startJobs() {
  cron.schedule("0 1 * * *", syncUsers());
};
