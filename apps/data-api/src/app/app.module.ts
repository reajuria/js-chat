import {
  CommandQueueModule,
  COMMAND_QUEUE_ROOT_MODULE,
} from '@js-chat/command-queue';
import { ConversationGatewayModule } from '@js-chat/conversation-gateway';
import {
  ConversationQueueModule,
  CONVERSATION_QUEUE_ROOT_MODULE,
} from '@js-chat/conversation-queue';
import { RepositoryCoreControllersModule } from '@js-chat/core-controllers';
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

@Module({
  imports: [
    COMMAND_QUEUE_ROOT_MODULE,
    CONVERSATION_QUEUE_ROOT_MODULE,
    CommandQueueModule,
    ConversationQueueModule,
    RedisConnectionModule,
    RedisRepositoryModule,
    RepositoryCoreControllersModule.register([
      {
        provide: COMMAND_REPOSITORY,
        useClass: CommandService,
      },
      {
        provide: CONVERSATION_REPOSITORY,
        useClass: ConversationService,
      },
      {
        provide: MESSAGE_REPOSITORY,
        useClass: MessageService,
      },
      {
        provide: ROOM_REPOSITORY,
        useClass: RoomService,
      },
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
