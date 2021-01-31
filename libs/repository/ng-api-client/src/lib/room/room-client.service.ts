import { Inject, Injectable } from '@angular/core';
import { Room } from '@js-chat/common';
import { RoomRepository, ROOM_REPOSITORY } from '@js-chat/repository';
import { DocumentBaseClient } from '../document-base-client';

@Injectable()
export class RoomClientService
  extends DocumentBaseClient<Room, RoomRepository>
  implements RoomRepository {
  constructor(
    @Inject(ROOM_REPOSITORY)
    roomRepository: RoomRepository,
  ) {
    super(roomRepository);
  }
}
