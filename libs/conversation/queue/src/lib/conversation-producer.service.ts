import { MessageData, ObjectId } from '@js-chat/common';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CONVERSATION_QUEUE_NAME } from './constants';
@Injectable()
export class ConversationProducerService {
  constructor(
    @InjectQueue(CONVERSATION_QUEUE_NAME) private conversationQueue: Queue,
  ) {}

  async emitServiceMessage(conversation: ObjectId, message: MessageData) {
    console.log(conversation, message);
    await this.conversationQueue.add('service-message', {
      conversation,
      message,
    });
  }

  async emitMessage(message: MessageData) {
    await this.conversationQueue.add('push-message', {
      message,
    });
  }
}
