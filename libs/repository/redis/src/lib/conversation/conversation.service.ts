import { Conversation, Message, User } from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { ConversationRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentBaseRepository } from '../document-repository';
import { ConversationEntity } from './conversation.entity';

@Injectable()
export class ConversationService
  extends DocumentBaseRepository<Conversation, typeof ConversationEntity>
  implements ConversationRepository {
  constructor(redisCS: RedisConnectionService) {
    super(Conversation, ConversationEntity, redisCS);
  }
  newMessage$: Observable<Message>;
  createMessage(user: User, contents: string): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  getMessages(): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}
