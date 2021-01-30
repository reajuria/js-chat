import { Module } from '@nestjs/common';
import { RedisConnectionService } from './redis-connection.service';

@Module({
  providers: [RedisConnectionService],
  exports: [RedisConnectionService],
})
export class RedisConnectionModule {}
