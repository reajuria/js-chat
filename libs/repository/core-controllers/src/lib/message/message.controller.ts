import { Message } from '@js-chat/common';
import { MessageRepository, MESSAGE_REPOSITORY } from '@js-chat/repository';
import { Controller, Inject } from '@nestjs/common';
import { DocumentBaseController } from '../document-controller';

@Controller('messages')
export class MessageController
  extends DocumentBaseController<Message, MessageRepository>
  implements MessageRepository {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    messageRepository: MessageRepository,
  ) {
    super(messageRepository);
  }
}
