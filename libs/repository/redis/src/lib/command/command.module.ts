import { CommandQueueModule } from '@js-chat/command-queue';
import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { CommandService } from './command.service';

@Module({
  imports: [RedisConnectionModule, CommandQueueModule],
  providers: [CommandService],
  exports: [CommandService],
})
export class CommandModule {}
