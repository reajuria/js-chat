import {
  CommandQueueModule,
  COMMAND_QUEUE_ROOT_MODULE,
} from '@js-chat/command-queue';
import { ConversationGatewayModule } from '@js-chat/conversation-gateway';
import {
  ConversationQueueModule,
  CONVERSATION_QUEUE_ROOT_MODULE,
} from '@js-chat/conversation-queue';
import {
  RedisConnectionModule,
  RedisConnectionService,
} from '@js-chat/redis-connection';
import {
  COMMAND_REPOSITORY,
  CONVERSATION_REPOSITORY,
  MESSAGE_REPOSITORY,
  ROOM_REPOSITORY,
  USER_REPOSITORY,
} from '@js-chat/repository';
import {
  CommandService,
  ConversationService,
  MessageService,
  RedisRepositoryModule,
  RoomService,
  UserService,
} from '@js-chat/repository-redis';
import { Module } from '@nestjs/common';
import { CommandControllerModule } from './controllers/command';
import { ConversationControllerModule } from './controllers/conversation';
import { MessageControllerModule } from './controllers/message';
import { RoomControllerModule } from './controllers/room';
import { UserControllerModule } from './controllers/user';

@Module({
  imports: [
    COMMAND_QUEUE_ROOT_MODULE,
    CONVERSATION_QUEUE_ROOT_MODULE,
    CommandQueueModule,
    ConversationQueueModule,
    RedisConnectionModule,
    RedisRepositoryModule,
    CommandControllerModule.register([
      {
        provide: COMMAND_REPOSITORY,
        useClass: CommandService,
      },
      RedisConnectionService,
    ]),
    ConversationControllerModule.register([
      {
        provide: CONVERSATION_REPOSITORY,
        useClass: ConversationService,
      },
      RedisConnectionService,
    ]),
    MessageControllerModule.register([
      {
        provide: MESSAGE_REPOSITORY,
        useClass: MessageService,
      },
      RedisConnectionService,
    ]),
    RoomControllerModule.register([
      {
        provide: ROOM_REPOSITORY,
        useClass: RoomService,
      },
      RedisConnectionService,
    ]),
    UserControllerModule.register([
      {
        provide: USER_REPOSITORY,
        useClass: UserService,
      },
      RedisConnectionService,
    ]),
    ConversationGatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
