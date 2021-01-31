import { Command } from '@js-chat/common';
import { CommandRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { DocumentBaseClient } from '../document-base-client';

export class CommandHttpClient
  extends DocumentBaseClient<Command>
  implements CommandRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios, '/commands', Command);
  }
  execute(command: string, input: Record<string, string>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
