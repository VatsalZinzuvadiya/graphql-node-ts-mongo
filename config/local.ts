const env = process.env.ENVIRONMENT || ''; // Ensures env is always a string
const isHosted = ['production', 'development'].includes(env);

function initEnv() {
  if (['production', 'development'].includes(env)) return;
  require('dotenv').config();
}

initEnv();

module.exports = {
  production: false,
  server: {
    port: '4000',
  },
  jwt: {
    tokenSecret: process.env.JWT_SECRET,
    tokenExpireTime: '2d',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: 'default',
  },
  mongoDb: {
    url: process.env.MONGO_URI,
    user: process.env.USER_TABLE,
    post: process.env.POST_TABLE,
  },
  appVersion: '0.0.1',
};
