import { Conversation, Message, User } from '@js-chat/common';
import {
  ConversationRepository,
  CONVERSATION_REPOSITORY,
} from '@js-chat/repository';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentBaseClient } from '../document-base-client';

@Injectable()
export class ConversationClientService
  extends DocumentBaseClient<Conversation, ConversationRepository>
  implements ConversationRepository {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    conversationRepository: ConversationRepository,
  ) {
    super(conversationRepository);
  }
  newMessage$: Observable<Message>;
  createMessage(
    conversation: Conversation,
    user: User,
    contents: string,
  ): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  getMessages(conversation: Conversation): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}
