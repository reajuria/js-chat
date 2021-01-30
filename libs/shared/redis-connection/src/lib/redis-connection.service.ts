import { Injectable } from '@nestjs/common';
import * as redis from 'ioredis';
import { isNil } from 'lodash';
import { redisEnvironment } from './environment';

const pool: { [alias: string]: redis.Redis } = {};

@Injectable()
export class RedisConnectionService {
  createConnection(alias = 'default') {
    if (isNil(pool[alias])) {
      pool[alias] = redis(redisEnvironment.port, redisEnvironment.host, {
        ...redisEnvironment.properties,
      });
    }
    return this.getConnection(alias);
  }

  getConnection(alias = 'default') {
    return pool[alias];
  }

  disconnect(alias: string) {
    if (isNil(pool[alias]) === false) {
      pool[alias].disconnect();
      pool[alias].discard();
      delete pool[alias];
    }
  }
}
