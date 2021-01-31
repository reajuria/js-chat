import { User } from '@js-chat/common';
import { UserRepository, USER_REPOSITORY } from '@js-chat/repository';
import { Controller, Inject } from '@nestjs/common';
import { DocumentBaseController } from '../document-controller';

@Controller('users')
export class UserController
  extends DocumentBaseController<User, UserRepository>
  implements UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    userRepository: UserRepository,
  ) {
    super(userRepository);
  }
}
