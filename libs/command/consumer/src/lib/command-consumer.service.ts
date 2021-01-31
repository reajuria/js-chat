import { COMMAND_QUEUE_NAME } from '@js-chat/command-queue';
import { CommandData } from '@js-chat/common';
import { ConversationProducerService } from '@js-chat/conversation-queue';
import { CommandClientService } from '@js-chat/core-api-client';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(COMMAND_QUEUE_NAME)
export class CommandConsumerService {
  constructor(
    private commandService: CommandClientService,
    private conversationService: ConversationProducerService,
  ) {}

  @Process()
  parseJob(job: Job<{}>) {

  }

  processStockCommand() {}
}
