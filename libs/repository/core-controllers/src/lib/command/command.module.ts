import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CommandController } from './command.controller';

@Module({})
export class CommandControllerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: CommandControllerModule,
      controllers: [CommandController],
      providers,
    };
  }
}
