import { Inject, Injectable } from '@angular/core';
import { Message } from '@js-chat/common';
import { MessageRepository, MESSAGE_REPOSITORY } from '@js-chat/repository';
import { DocumentBaseClient } from '../document-base-client';

@Injectable()
export class MessageClientService
  extends DocumentBaseClient<Message, MessageRepository>
  implements MessageRepository {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    messageRepository: MessageRepository,
  ) {
    super(messageRepository);
  }
}
