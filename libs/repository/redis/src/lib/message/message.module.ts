import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Module({
  imports: [RedisConnectionModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
