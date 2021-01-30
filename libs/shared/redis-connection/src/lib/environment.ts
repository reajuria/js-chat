import { URL } from 'url';

const DEFAULT_URI = 'redis://localhost:6379';

export const redisEnvironment = {
  uri: process.env.REDIS_URI || DEFAULT_URI,
  host: '',
  port: 0,
  properties: {},
};

try {
  const uri = new URL(redisEnvironment.uri);
  redisEnvironment.host = uri.hostname;
  redisEnvironment.port = Number(uri.port || '6379');
  redisEnvironment.properties = uri.searchParams || {};
  console.log(redisEnvironment);
} catch (error) {
  console.error('Redis Environment error', error);
}
