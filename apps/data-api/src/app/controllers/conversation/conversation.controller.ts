import { Conversation, Message, ObjectId } from '@js-chat/common';
import {
  ConversationRepository,
  CONVERSATION_REPOSITORY,
} from '@js-chat/repository';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentBaseController } from '../document-controller';

@Controller('conversations')
export class ConversationController
  extends DocumentBaseController<Conversation, ConversationRepository>
  implements ConversationRepository {
  newMessage$: Observable<Message>;

  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    public conversationRepository: ConversationRepository,
  ) {
    super(conversationRepository);
  }

  @Post('message')
  async createMessage(
    @Body('conversation')
    conversation: ObjectId,

    @Body('user')
    user: ObjectId,

    @Body('contents')
    contents: string,
  ): Promise<Message> {
    return await this.conversationRepository.createMessage(
      conversation,
      user,
      contents,
    );
  }

  @Get('messages')
  async getMessages(
    @Query('conversation') conversation: ObjectId,
  ): Promise<Message[]> {
    return await this.conversationRepository.getMessages(conversation);
  }

  @Post('service-message')
  async pushServiceMessage(
    @Body('conversation')
    conversation: Conversation,
    @Body('message')
    message: Message,
  ): Promise<void> {
    this.conversationRepository.pushServiceMessage(
      new Conversation(conversation),
      new Message(message),
    );
  }
}
