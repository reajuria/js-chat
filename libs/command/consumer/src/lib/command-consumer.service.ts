import { COMMAND_QUEUE_NAME } from '@js-chat/command-queue';
import { Command, ObjectId } from '@js-chat/common';
import { ConversationProducerService } from '@js-chat/conversation-queue';
import {
  CommandClientService,
  ConversationClientService,
  UserClientService,
} from '@js-chat/core-api-client';
import { getStockServiceUrl } from '@js-chat/stock-common';
import { Process, Processor } from '@nestjs/bull';
import Axios from 'axios';
import { Job } from 'bull';
import { isEmpty, isNil } from 'lodash';

@Processor(COMMAND_QUEUE_NAME)
export class CommandConsumerService {
  constructor(
    private commandService: CommandClientService,
    private conversationService: ConversationClientService,
    private userService: UserClientService,
    private conversationProducer: ConversationProducerService,
  ) {
    this.init();
  }

  async init() {
    // Initialize for evaluation
    const exists = await this.commandService.findOne({ label: '/stock=' });
    if (isNil(exists) || isEmpty(exists)) {
      try {
        await this.commandService.insert({
          name: 'Get stock info',
          patternString: '/stock=[\\w._-]+$',
          label: '/stock=',
          queue: COMMAND_QUEUE_NAME,
        });
      } catch (error) {
        console.log('command', error);
      }
      try {
        await this.userService.insert({
          alias: 'Bot',
          username: 'bot',
        });
      } catch (error) {
        console.log('user', error);
      }
    }
  }

  @Process()
  async parseJob(job: Job<{ command: string; data: any }>) {
    const command = await this.commandService.findById(job.data.command);
    await this.processStockCommand(command, job.data.data);
  }

  async processStockCommand(
    command: Command,
    data: { contents: string; conversation: ObjectId },
  ) {
    console.log('Process Stock Command', command, data);
    try {
      let messageContents = 'Service was not able to get quote';
      let stockId = '';
      try {
        stockId = data?.contents.replace('/stock=', '').toLowerCase();
        const stockData = await this.requestStockInfo(stockId);
        messageContents = `${stockData.symbol} quite is $${stockData.close} per share`;
      } catch (error) {
        messageContents += ` ${stockId}`;
      }

      const conversation = await this.conversationService.findById(
        data.conversation,
      );
      const user = await this.userService.findOne({ username: 'bot' });
      const message = conversation.createMessage(user.id, messageContents);
      this.conversationProducer.emitServiceMessage(
        data.conversation,
        message.toJSON(),
      );
      return message.toJSON();
    } catch (error) {
      // TODO
    }
  }

  async requestStockInfo(stockid: string) {
    const requestUrl = getStockServiceUrl(stockid);
    const response = (await Axios.get(requestUrl)).data as string;
    const [symbol, date, time, open, high, low, close, volume] = response
      .split('\r\n')[1]
      ?.split(',');
    return {
      symbol,
      date,
      time,
      open,
      high,
      low,
      close,
      volume,
    };
  }
}
