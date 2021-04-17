import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MessageController } from './message.controller';

@Module({})
export class MessageControllerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: MessageControllerModule,
      controllers: [MessageController],
      providers,
    };
  }
}
