import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConversationClientService } from './conversation-client.service';

@Module({})
export class ConversationClientModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      global: true,
      module: ConversationClientModule,
      providers: [...providers, ConversationClientService],
      exports: [ConversationClientService],
    };
  }
}
