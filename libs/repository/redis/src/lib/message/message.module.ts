import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Global()
@Module({
  imports: [RedisConnectionModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
