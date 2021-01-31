import { Module } from '@nestjs/common';
import { ConversationProducerService } from './conversation-producer.service';

@Module({
  controllers: [],
  providers: [ConversationProducerService],
  exports: [],
})
export class ConversationQueueModule {}
