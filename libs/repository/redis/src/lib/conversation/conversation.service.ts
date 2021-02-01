import { Conversation, Message, ObjectId } from '@js-chat/common';
import { ConversationProducerService } from '@js-chat/conversation-queue';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { ConversationRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { reverse } from 'lodash';
import { Observable } from 'rxjs';
import { DocumentBaseRepository } from '../document-repository';
import { MessageEntity, MessageService } from '../message';
import { ConversationEntity } from './conversation.entity';

@Injectable()
export class ConversationService
  extends DocumentBaseRepository<Conversation, typeof ConversationEntity>
  implements ConversationRepository {
  constructor(
    redisCS: RedisConnectionService,
    private conversationProducer: ConversationProducerService,
    private messageService: MessageService,
  ) {
    super(Conversation, ConversationEntity, redisCS);
  }
  newMessage$: Observable<Message>;
  async createMessage(
    conversation: ObjectId,
    user: ObjectId,
    contents: string,
  ): Promise<Message> {
    const conversationOb = await this.findById(conversation);
    const message = conversationOb.createMessage(user, contents);
    await this.messageService.insert(message.toJSON());
    return message;
  }
  async getMessages(conversation: ObjectId): Promise<Message[]> {
    const [messages] = await MessageEntity.query()
      .where('conversation', '=', conversation)
      .sortBy('timestamp', 'desc')
      .limit(50)
      .run();
    return reverse(
      messages.map((message) => {
        return new Message(message);
      }) || [],
    );
  }
  pushServiceMessage(
    conversation: Conversation,
    message: Message,
  ): Promise<void> {
    return this.conversationProducer.emitServiceMessage(
      conversation.id,
      message.toJSON(),
    );
  }
}
