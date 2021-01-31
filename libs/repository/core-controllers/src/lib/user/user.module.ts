import { DynamicModule, Module, Provider } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({})
export class UserControllerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: UserControllerModule,
      controllers: [UserController],
      providers,
    };
  }
}
