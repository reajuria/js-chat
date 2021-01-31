import { Command, ObjectId } from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { CommandRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { DocumentBaseRepository } from '../document-repository';
import { CommandEntity } from './command.entity';

@Injectable()
export class CommandService
  extends DocumentBaseRepository<Command, typeof CommandEntity>
  implements CommandRepository {
  constructor(redisCS: RedisConnectionService) {
    super(Command, CommandEntity, redisCS);
  }
  execute(command: ObjectId, input: Record<string, string>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

CommandEntity.create({});
