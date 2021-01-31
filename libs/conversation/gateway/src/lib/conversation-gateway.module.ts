import { Module } from '@nestjs/common';
import { ConversationGateway } from './conversation/conversation.gateway';

@Module({
  controllers: [],
  providers: [ConversationGateway],
})
export class ConversationGatewayModule {}
