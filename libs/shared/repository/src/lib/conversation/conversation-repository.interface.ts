import { Conversation, Message, ObjectId } from '@js-chat/common';
import { Observable } from 'rxjs';
import { DocumentRepository } from '../document/document-repository.interface';

export const CONVERSATION_REPOSITORY = 'CONVERSATION_REPOSITORY';
export interface ConversationRepository
  extends DocumentRepository<Conversation> {
  newMessage$: Observable<Message>;
  createMessage(
    conversation: ObjectId,
    user: ObjectId,
    contents: string,
  ): Promise<Message>;
  getMessages(conversation: ObjectId): Promise<Message[]>;
  pushServiceMessage(
    conversation: Conversation,
    message: Message,
  ): Promise<void>;
}
