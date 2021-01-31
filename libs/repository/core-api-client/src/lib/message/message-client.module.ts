import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MessageClientService } from './message-client.service';

@Module({})
export class MessageClientModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: MessageClientModule,
      providers: [...providers, MessageClientService],
    };
  }
}
