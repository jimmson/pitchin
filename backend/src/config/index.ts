import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config({ path: '../.env' })) {
  // This error should crash whole process

  throw new Error('could not find .env file');
}

export default {
  dev: process.env.NODE_ENV === 'development',
  app: {
    name: '',
    host: process.env.APP_HOST,
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin',
    password: process.env.ADMIN_PASSWORD,
  },
  jwt: {
    privateKey: process.env.PRIVATE_KEY,
    ttl: process.env.JWT_TTL,
  },
  cryptr: {
    privateKey: process.env.PRIVATE_KEY,
  },
  api: {
    port: process.env.PORT || 8000,
    prefix: '/',
  },
  zelos: {
    subdomain: process.env.ZELOS_SUBDOMAIN || '',
    email: process.env.ZELOS_EMAIL || '',
    password: process.env.ZELOS_PASSWORD || '',
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY || '',
    listID: process.env.MAILCHIMP_LIST_ID || '',
  },
  db: {
    host: process.env.DB_HOST,
    db: process.env.WORKSPACE_ID,
    authSource: process.env.DB_AUTH_SOURCE || 'admin',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
  },
  infobip: {
    baseUrl: process.env.INFOBIP_BASE_URL,
    apiKey: process.env.INFOBIP_API_KEY,
    sender: process.env.INFOBIP_SENDER,
  },
  mailgun: {
    baseURL: process.env.MAILGUN_BASE_URL,
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    from: process.env.MAILGUN_FROM_EMAIL,
  },
  openWeatherMap: {
    apiKey: process.env.OPEN_WEATHER_MAP_API_KEY || '',
  },
};
