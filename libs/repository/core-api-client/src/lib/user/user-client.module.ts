import { DynamicModule, Module, Provider } from '@nestjs/common';
import { UserClientService } from './user-client.service';

@Module({})
export class UserClientModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      global: true,
      module: UserClientModule,
      providers: [...providers, UserClientService],
      exports: [UserClientService],
    };
  }
}
