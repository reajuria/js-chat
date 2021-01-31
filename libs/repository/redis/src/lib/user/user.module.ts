import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [RedisConnectionModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
