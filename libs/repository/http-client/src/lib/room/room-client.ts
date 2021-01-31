import { Room } from '@js-chat/common';
import { RoomRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { DocumentBaseClient } from '../document-base-client';

export class RoomHttpClient
  extends DocumentBaseClient<Room>
  implements RoomRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios, '/rooms');
  }
}
