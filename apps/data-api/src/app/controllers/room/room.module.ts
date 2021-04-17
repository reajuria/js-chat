import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RoomController } from './room.controller';

@Module({})
export class RoomControllerModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: RoomControllerModule,
      controllers: [RoomController],
      providers,
    };
  }
}
