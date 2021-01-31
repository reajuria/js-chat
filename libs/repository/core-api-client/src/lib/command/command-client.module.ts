import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CommandClientService } from './command-client.service';

@Module({})
export class CommandClientModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: CommandClientModule,
      providers: [...providers, CommandClientService],
    };
  }
}
