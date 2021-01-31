import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConversationController } from './conversation.controller';

@Module({})
export class ConversationControllerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: ConversationControllerModule,
      controllers: [ConversationController],
      providers,
    };
  }
}
