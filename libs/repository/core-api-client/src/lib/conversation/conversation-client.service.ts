import { Conversation, Message, ObjectId } from '@js-chat/common';
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
    public conversationRepository: ConversationRepository,
  ) {
    super(conversationRepository);
  }
  newMessage$: Observable<Message>;
  createMessage(
    conversation: ObjectId,
    user: ObjectId,
    contents: string,
  ): Promise<Message> {
    return this.conversationRepository.createMessage(
      conversation,
      user,
      contents,
    );
  }
  getMessages(conversation: ObjectId): Promise<Message[]> {
    return this.conversationRepository.getMessages(conversation);
  }
  pushServiceMessage(
    conversation: Conversation,
    message: Message,
  ): Promise<void> {
    return this.conversationRepository.pushServiceMessage(
      conversation,
      message,
    );
  }
}
