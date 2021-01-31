import { User } from '@js-chat/common';
import { UserRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { DocumentBaseClient } from '../document-base-client';

export class UserHttpClient
  extends DocumentBaseClient<User>
  implements UserRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios, '/users');
  }
}
