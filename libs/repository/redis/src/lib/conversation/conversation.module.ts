import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Module({
  imports: [RedisConnectionModule],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
