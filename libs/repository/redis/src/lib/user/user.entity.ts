import { UserData } from '@js-chat/common';
import { BaseEntity, Column, Entity } from 'ts-redis-orm';

@Entity({ connection: 'default', table: 'User' })
export class UserEntity extends BaseEntity implements UserData {
  @Column()
  id?: string;

  @Column()
  alias: string;

  @Column()
  username: string;

  @Column()
  password?: string;

  @Column()
  timestamp?: number;
}
