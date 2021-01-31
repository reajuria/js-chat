import { parse } from 'url';

const DEFAULT_URI = 'redis://localhost:6379';

let envWrapper = {
  uri: process.env.REDIS_URI || DEFAULT_URI,
  host: '',
  port: 0,
  properties: {},
};

try {
  const uri = parse(envWrapper.uri, true);
  envWrapper.host = uri.hostname;
  envWrapper.port = Number(uri.port || '6379');
  envWrapper.properties = {
    ...(uri?.query || {}),
  };
  envWrapper = {
    ...envWrapper,
    ...envWrapper.properties,
  };
} catch (error) {
  console.error('Redis environment error', error);
}

export const redisEnvironment: {
  uri: string;
  host: string;
  port: number;
  properties: Record<string, any>;
  [extra: string]: any;
} = envWrapper;
