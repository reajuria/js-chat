import { CommandData } from '@js-chat/common';
import { BaseEntity, Column, Entity } from 'ts-redis-orm';

@Entity({ connection: 'default', table: 'Command' })
export class CommandEntity extends BaseEntity implements CommandData {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  patternString?: string;

  @Column()
  label?: string;

  @Column()
  queue: string;

  @Column()
  defaultParams?: Record<string, string>;

  @Column()
  timestamp?: number;
}
