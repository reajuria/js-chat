import { ConversationQueueModule } from '@js-chat/conversation-queue';
import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { MessageModule } from '../message';
import { ConversationService } from './conversation.service';

@Module({
  imports: [RedisConnectionModule, ConversationQueueModule, MessageModule],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
