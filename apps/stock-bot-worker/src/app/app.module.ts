import { CommandConsumerModule } from '@js-chat/command-consumer';
import { COMMAND_QUEUE_ROOT_MODULE } from '@js-chat/command-queue';
import { ConversationConsumerModule } from '@js-chat/conversation-consumer';
import { CONVERSATION_QUEUE_ROOT_MODULE } from '@js-chat/conversation-queue';
import { RepositoryCoreApiClientModule } from '@js-chat/core-api-client';
import { Module } from '@nestjs/common';
import { ConfigurationService, providers } from './configuration.service';
@Module({
  imports: [
    COMMAND_QUEUE_ROOT_MODULE,
    CONVERSATION_QUEUE_ROOT_MODULE,
    RepositoryCoreApiClientModule.register(providers),
    CommandConsumerModule.register(providers),
    ConversationConsumerModule.register(providers),
  ],
  providers: [ConfigurationService],
})
export class AppModule {}
