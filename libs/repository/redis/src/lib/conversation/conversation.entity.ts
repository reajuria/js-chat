import { ConversationData } from '@js-chat/common';
import { BaseEntity, Column, Entity } from 'ts-redis-orm';

@Entity({ connection: 'default', table: 'Conversation' })
export class ConversationEntity extends BaseEntity implements ConversationData {
  @Column()
  id?: string;

  @Column()
  key: string;

  @Column()
  participants: string[];

  @Column()
  updated?: number;

  @Column()
  timestamp?: number;
}
