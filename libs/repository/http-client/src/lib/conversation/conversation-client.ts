import { Conversation, Message, User } from '@js-chat/common';
import { ConversationRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
import { DocumentBaseClient } from '../document-base-client';

export class ConversationHttpClient
  extends DocumentBaseClient<Conversation>
  implements ConversationRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios, '/conversations');
  }
  newMessage$: Observable<Message>;
  createMessage(user: User, contents: string): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  getMessages(): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}
