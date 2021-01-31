import { Room } from '@js-chat/common';
import { DocumentRepository } from '../document/document-repository.interface';

export const ROOM_REPOSITORY = 'ROOM_REPOSITORY';

export type RoomRepository = DocumentRepository<Room>;
