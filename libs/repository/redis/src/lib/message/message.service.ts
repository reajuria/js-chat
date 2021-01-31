import { Message } from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { MessageRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { DocumentBaseRepository } from '../document-repository';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService
  extends DocumentBaseRepository<Message, typeof MessageEntity>
  implements MessageRepository {
  constructor(redisCS: RedisConnectionService) {
    super(Message, MessageEntity, redisCS);
  }
}
