import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';

@Module({
  imports: [RedisConnectionModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
