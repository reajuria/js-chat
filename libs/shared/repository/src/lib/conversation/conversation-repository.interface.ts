import { Conversation, Message, User } from '@js-chat/common';
import { Observable } from 'rxjs';
import { DocumentRepository } from '../document/document-repository.interface';

export const CONVERSATION_REPOSITORY = 'CONVERSATION_REPOSITORY';
export interface ConversationRepository
  extends DocumentRepository<Conversation> {
  newMessage$: Observable<Message>;
  createMessage(
    conversation: Conversation,
    user: User,
    contents: string,
  ): Promise<Message>;
  getMessages(conversation: Conversation): Promise<Message[]>;
}
