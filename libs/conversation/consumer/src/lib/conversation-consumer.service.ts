import { Conversation, Message, MessageData, ObjectId } from '@js-chat/common';
import { CONVERSATION_QUEUE_NAME } from '@js-chat/conversation-queue';
import { ConversationClientService } from '@js-chat/core-api-client';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(CONVERSATION_QUEUE_NAME)
export class ConversationConsumerService {
  constructor(
    private conversationService: ConversationClientService,
    private redis: RedisConnectionService,
  ) {}

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
    // await this.pushConversationMessage(job);
    return;
  }

  @Process('push-message')
  async pushConversationMessage(job: Job<{ message: MessageData }>) {
    console.log(job.data.message);
    return await this.redis
      .getConnection()
      .publish(
        'conversation-message:' + job.data.message.conversation,
        JSON.stringify(job.data.message),
      );
  }
}
