import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CommandClientModule } from './command/';
import { ConversationClientModule } from './conversation/';
import { MessageClientModule } from './message/';
import { RoomClientModule } from './room/';
import { UserClientModule } from './user/';

@Module({})
export class RepositoryCoreApiClientModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: RepositoryCoreApiClientModule,
      imports: [
        CommandClientModule.register(providers),
        ConversationClientModule.register(providers),
        MessageClientModule.register(providers),
        RoomClientModule.register(providers),
        UserClientModule.register(providers),
      ],
      providers,
    };
  }
}
