import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CommandHttpClient } from './command';
import { ConversationHttpClient } from './conversation';
import { MessageHttpClient } from './message';
import { RoomHttpClient } from './room';
import { UserHttpClient } from './user';

export function httpClients(input: AxiosRequestConfig | AxiosInstance) {
  let axios: AxiosInstance;
  if ('defaults' in input) {
    axios = input;
  } else {
    axios = Axios.create(input);
  }
  return {
    axios,
    command: new CommandHttpClient(axios),
    conversation: new ConversationHttpClient(axios),
    message: new MessageHttpClient(axios),
    room: new RoomHttpClient(axios),
    user: new UserHttpClient(axios),
  };
}
