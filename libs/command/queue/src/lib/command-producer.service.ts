import { ObjectId } from '@js-chat/common';
import { InjectQueue, OnGlobalQueueError, OnQueueError } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { COMMAND_QUEUE_NAME } from './constants';
@Injectable()
export class CommandProducerService {
  constructor(@InjectQueue(COMMAND_QUEUE_NAME) private commandQueue: Queue) {}

  @OnGlobalQueueError({ name: COMMAND_QUEUE_NAME })
  @OnQueueError({ name: COMMAND_QUEUE_NAME })
  onError(...args) {
    console.log(args);
  }

  async requestCommand(command: ObjectId, data: any) {
    await this.commandQueue.add({ command, data });
  }
}
