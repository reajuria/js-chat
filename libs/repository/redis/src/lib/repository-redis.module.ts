import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConversationModule,
    MessageModule,
    RoomModule,
    CommandModule,
    UserModule,
  ],
})
export class RedisRepositoryModule {}
