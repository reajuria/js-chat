import { Room } from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { RoomRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { DocumentBaseRepository } from '../document-repository';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService
  extends DocumentBaseRepository<Room, typeof RoomEntity>
  implements RoomRepository {
  constructor(redisCS: RedisConnectionService) {
    super(Room, RoomEntity, redisCS);
  }
}
