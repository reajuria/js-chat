import { Conversation, Message, MessageData, ObjectId } from '@js-chat/common';
import { CONVERSATION_QUEUE_NAME } from '@js-chat/conversation-queue';
import { ConversationClientService } from '@js-chat/core-api-client';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(CONVERSATION_QUEUE_NAME)
export class ConversationConsumerService {
  constructor(private conversationService: ConversationClientService) {}

  @Process('service-message')
  async processServiceMessage(
    job: Job<{ conversation: ObjectId; message: MessageData }>,
  ) {
    const conversation = await this.conversationService.findById(
      job.data.conversation,
    );
    await this.conversationService.pushServiceMessage(
      conversation.toJSON() as Conversation,
      job.data.message as Message,
    );
    return;
  }
}
