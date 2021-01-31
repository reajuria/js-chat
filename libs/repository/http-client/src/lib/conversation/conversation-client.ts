import { Conversation, Message, User } from '@js-chat/common';
import { ConversationRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
import { DocumentBaseClient } from '../document-base-client';

export class ConversationHttpClient
  extends DocumentBaseClient<Conversation>
  implements ConversationRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios, '/conversations', Conversation);
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
