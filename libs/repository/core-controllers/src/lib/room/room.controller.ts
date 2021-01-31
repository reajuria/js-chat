import { Room } from '@js-chat/common';
import { RoomRepository, ROOM_REPOSITORY } from '@js-chat/repository';
import { Controller, Inject } from '@nestjs/common';
import { DocumentBaseController } from '../document-controller';

@Controller('rooms')
export class RoomController
  extends DocumentBaseController<Room, RoomRepository>
  implements RoomRepository {
  constructor(
    @Inject(ROOM_REPOSITORY)
    roomRepository: RoomRepository,
  ) {
    super(roomRepository);
  }
}
