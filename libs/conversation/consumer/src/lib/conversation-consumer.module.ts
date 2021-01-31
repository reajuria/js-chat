import { ConversationQueueModule } from '@js-chat/conversation-queue';
import { RepositoryCoreApiClientModule } from '@js-chat/core-api-client';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConversationConsumerService } from './conversation-consumer.service';

@Module({})
export class ConversationConsumerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: ConversationConsumerModule,
      imports: [
        ConversationQueueModule,
        RepositoryCoreApiClientModule.register(providers),
      ],
      providers: [...providers, ConversationConsumerService],
    };
  }
}
