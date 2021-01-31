import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CommandControllerModule } from './command/command.module';
import { ConversationControllerModule } from './conversation/conversation.module';
import { MessageControllerModule } from './message/message.module';
import { RoomControllerModule } from './room/room.module';
import { UserControllerModule } from './user/user.module';

@Module({})
export class RepositoryCoreControllersModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: RepositoryCoreControllersModule,
      imports: [
        CommandControllerModule.register(providers),
        ConversationControllerModule.register(providers),
        MessageControllerModule.register(providers),
        RoomControllerModule.register(providers),
        UserControllerModule.register(providers),
      ],
      providers,
    };
  }
}
