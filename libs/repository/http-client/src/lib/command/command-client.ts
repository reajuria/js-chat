import { Command, ObjectId } from '@js-chat/common';
import { CommandRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { DocumentBaseClient } from '../document-base-client';

export class CommandHttpClient
  extends DocumentBaseClient<Command>
  implements CommandRepository {
  constructor(public readonly axios: AxiosInstance) {
    super(axios, '/commands', Command);
  }
  execute(command: ObjectId, input: Record<string, string>): Promise<void> {
    return this.axios.post('/commands/execute', { command, input });
  }
}
