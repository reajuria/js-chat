import { Global, Module } from '@nestjs/common';
import { CONVERSATION_QUEUE_REGISTER } from './constants';
import { ConversationProducerService } from './conversation-producer.service';

@Global()
@Module({
  imports: [CONVERSATION_QUEUE_REGISTER],
  providers: [ConversationProducerService],
  exports: [ConversationProducerService],
})
export class ConversationQueueModule {}
