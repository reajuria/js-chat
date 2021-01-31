import { User } from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { UserRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { DocumentBaseRepository } from '../document-repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService
  extends DocumentBaseRepository<User, typeof UserEntity>
  implements UserRepository {
  constructor(redisCS: RedisConnectionService) {
    super(User, UserEntity, redisCS);
  }
}
