import { RedisConnectionModule } from '@js-chat/redis-connection';
import { Module } from '@nestjs/common';
import { CommandService } from './command.service';

@Module({
  imports: [RedisConnectionModule],
  providers: [CommandService],
  exports: [CommandService],
})
export class CommandModule {}
