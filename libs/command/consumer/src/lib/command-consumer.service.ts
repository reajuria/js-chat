import { COMMAND_QUEUE_NAME } from '@js-chat/command-queue';
import { Command, Message, ObjectId } from '@js-chat/common';
import { ConversationProducerService } from '@js-chat/conversation-queue';
import {
  CommandClientService,
  UserClientService,
} from '@js-chat/core-api-client';
import { getStockServiceUrl } from '@js-chat/stock-common';
import { Process, Processor } from '@nestjs/bull';
import Axios from 'axios';
import { Job } from 'bull';

@Processor(COMMAND_QUEUE_NAME)
export class CommandConsumerService {
  constructor(
    private commandService: CommandClientService,
    private userService: UserClientService,
    private conversationProducer: ConversationProducerService,
  ) {}

  @Process()
  async parseJob(job: Job<{ command: string; data: any }>) {
    const command = await this.commandService.findById(job.data.command);
    this.processStockCommand(command, job.data.data);
  }

  async processStockCommand(
    command: Command,
    data: { contents: string; conversation: ObjectId },
  ) {
    try {
      const requestUrl = getStockServiceUrl(data?.contents);
      const response = (await Axios.get(requestUrl)).data as string;
      console.log(response);
      const user = await this.userService.findOne({ username: 'bot' });
      const message = new Message({
        conversation: data.conversation,
        user: user.id,
        payload: data?.contents,
      });
      this.conversationProducer.emitServiceMessage(
        data.conversation,
        message.toJSON(),
      );
      return message.toJSON();
    } catch (error) {
      // TODO
    }
  }
}
