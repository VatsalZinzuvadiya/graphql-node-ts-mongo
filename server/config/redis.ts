import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const host = process.env.REDIS_HOST!;
const port = process.env.REDIS_PORT!;
const password = process.env.REDIS_PASSWORD!;
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
