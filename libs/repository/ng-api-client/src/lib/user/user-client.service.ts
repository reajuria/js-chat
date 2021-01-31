import { Inject, Injectable } from '@angular/core';
import { User } from '@js-chat/common';
import { UserRepository, USER_REPOSITORY } from '@js-chat/repository';
import { DocumentBaseClient } from '../document-base-client';

@Injectable()
export class UserClientService
  extends DocumentBaseClient<User, UserRepository>
  implements UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    userRepository: UserRepository,
  ) {
    super(userRepository);
  }
}
