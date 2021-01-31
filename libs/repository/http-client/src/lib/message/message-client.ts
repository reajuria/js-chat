import { Message } from '@js-chat/common';
import { MessageRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { DocumentBaseClient } from '../document-base-client';

export class MessageHttpClient
  extends DocumentBaseClient<Message>
  implements MessageRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios, '/messages');
  }
}
