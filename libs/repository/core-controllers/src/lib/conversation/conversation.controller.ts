import { Conversation, Message, User } from '@js-chat/common';
import {
  ConversationRepository,
  CONVERSATION_REPOSITORY,
} from '@js-chat/repository';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentBaseController } from '../document-controller';

@Controller('conversations')
export class ConversationController
  extends DocumentBaseController<Conversation, ConversationRepository>
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
