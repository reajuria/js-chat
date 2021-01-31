import { RoomData } from '@js-chat/common';
import { BaseEntity, Column, Entity } from 'ts-redis-orm';

@Entity({ connection: 'default', table: 'Room' })
export class RoomEntity extends BaseEntity implements RoomData {
  @Column()
  id?: string;

  @Column()
  alias: string;

  @Column()
  admins: string[];

  @Column()
  conversation: string;

  @Column()
  timestamp?: number;
}
