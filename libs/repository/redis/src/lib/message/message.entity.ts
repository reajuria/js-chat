import { MessageData } from '@js-chat/common';
import { BaseEntity, Column, Entity } from 'ts-redis-orm';

@Entity({ connection: 'default', table: 'Message' })
export class MessageEntity extends BaseEntity implements MessageData {
  @Column()
  id?: string;

  @Column()
  user: string;

  @Column()
  conversation: string;

  @Column()
  payload: string;

  @Column()
  sent?: boolean;

  @Column()
  timestamp?: number;
}
