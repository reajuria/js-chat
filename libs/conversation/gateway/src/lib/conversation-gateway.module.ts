import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { ConversationGateway } from './conversation/conversation.gateway';

@Module({
  imports: [RedisConnectionModule],
  providers: [ConversationGateway],
})
export class ConversationGatewayModule {}
