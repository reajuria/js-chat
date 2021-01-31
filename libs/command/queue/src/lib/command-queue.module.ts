import { Module } from '@nestjs/common';
import { COMMAND_QUEUE_REGISTER } from './constants';
import { CommandProducerService } from './command-producer.service';

@Module({
  imports: [COMMAND_QUEUE_REGISTER],
  providers: [CommandProducerService],
})
export class CommandQueueModule {}
