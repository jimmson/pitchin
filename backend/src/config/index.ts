import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config({ path: '../.env' })) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  api: {
    port: process.env.PORT || 8000,
    prefix: '/',
  },
  zelos: {
    workspace: process.env.ZELOS_WORKSPACE,
    email: process.env.ZELOS_USER_EMAIL,
    password: process.env.ZELOS_USER_PASSWORD,
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    listID: process.env.MAILCHIMP_LIST_ID,
  },
  db: {
    host: process.env.DB_HOST,
    db: process.env.WORKSPACE_ID,
    authSource: process.env.DB_AUTH_SOURCE || 'admin',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
