import { CommandProducerService } from '@js-chat/command-queue';
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
  constructor(
    redisCS: RedisConnectionService,
    private commandProducer: CommandProducerService,
  ) {
    super(Command, CommandEntity, redisCS);
  }

  execute(command: ObjectId, input: Record<string, string>): Promise<void> {
    return this.commandProducer.requestCommand(command, input);
  }
}

CommandEntity.create({});
