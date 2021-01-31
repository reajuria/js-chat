import { Conversation, Message, User } from '@js-chat/common';
import { Observable } from 'rxjs';
import { DocumentRepository } from '../document/document-repository.interface';

export const CONVERSATION_REPOSITORY = 'CONVERSATION_REPOSITORY';
export interface ConversationRepository
  extends DocumentRepository<Conversation> {
  newMessage$: Observable<Message>;
  createMessage(user: User, contents: string): Promise<Message>;
  getMessages(): Promise<Message[]>;
}
