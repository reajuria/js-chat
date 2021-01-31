import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RoomClientService } from './room-client.service';

@Module({})
export class RoomClientModule {
  static register(providers: Provider[]): DynamicModule {
    return {
      module: RoomClientModule,
      providers: [...providers, RoomClientService],
    };
  }
}
