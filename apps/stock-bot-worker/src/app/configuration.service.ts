import { httpClients } from '@js-chat/http-client';
import {
  COMMAND_REPOSITORY,
  CONVERSATION_REPOSITORY,
  MESSAGE_REPOSITORY,
  ROOM_REPOSITORY,
  USER_REPOSITORY,
} from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigurationService {
  axios = Axios.create({ baseURL: environment.dataApiUrl });
  clients = httpClients(this.axios);

  setJWT(input: string) {
    this.axios.defaults.headers = {
      ...this.axios.defaults.headers,
      authorization: 'Bearer ' + input,
    };
  }
}

export const providers = [
  ConfigurationService,
  {
    provide: COMMAND_REPOSITORY,
    useFactory: (configuration: ConfigurationService) => {
      return configuration.clients.command;
    },
    inject: [ConfigurationService],
  },
  {
    provide: CONVERSATION_REPOSITORY,
    useFactory: (configuration: ConfigurationService) => {
      return configuration.clients.conversation;
    },
    inject: [ConfigurationService],
  },
  {
    provide: MESSAGE_REPOSITORY,
    useFactory: (configuration: ConfigurationService) => {
      return configuration.clients.message;
    },
    inject: [ConfigurationService],
  },
  {
    provide: ROOM_REPOSITORY,
    useFactory: (configuration: ConfigurationService) => {
      return configuration.clients.room;
    },
    inject: [ConfigurationService],
  },
  {
    provide: USER_REPOSITORY,
    useFactory: (configuration: ConfigurationService) => {
      return configuration.clients.user;
    },
    inject: [ConfigurationService],
  },
];
