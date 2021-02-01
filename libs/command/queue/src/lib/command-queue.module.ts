import { ConversationQueueModule } from '@js-chat/conversation-queue';
import { Global, Module } from '@nestjs/common';
import { CommandProducerService } from './command-producer.service';
import { COMMAND_QUEUE_REGISTER } from './constants';

@Global()
@Module({
  imports: [COMMAND_QUEUE_REGISTER, ConversationQueueModule],
  providers: [CommandProducerService],
  exports: [CommandProducerService],
})
export class CommandQueueModule {}
