import { createClient } from 'redis';
import dotenv from 'dotenv';
const config = require('../../config');

dotenv.config();
const host = config.redis.host;
const port = config.redis.port;
const password = config.redis.password;
const redisConfigObject = {
  socket: {
    host: host,
    port: parseInt(port, 10),
  },
  password: password,
};
const client = createClient(redisConfigObject);
client.on('error', (error: unknown) => {
  if (error instanceof Error) {
    console.error('Redis Client Error:', error.message);
  } else {
    console.error('Redis Client Error: Unknown error');
  }
});
client.connect()
  .then(() => console.log('Redis client connected successfully'))
  .catch((err) => console.error('Error connecting to Redis', err));

export default client;
