import { CommandQueueModule } from '@js-chat/command-queue';
import { ConversationQueueModule } from '@js-chat/conversation-queue';
import { RepositoryCoreApiClientModule } from '@js-chat/core-api-client';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CommandConsumerService } from './command-consumer.service';

@Module({})
export class CommandConsumerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: CommandConsumerModule,
      imports: [
        CommandQueueModule,
        RepositoryCoreApiClientModule.register(providers),
        ConversationQueueModule,
      ],
      providers: [...providers, CommandConsumerService],
    };
  }
}
