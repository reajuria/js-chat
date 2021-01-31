import { User } from '@js-chat/common';
import { DocumentRepository } from '../document/document-repository.interface';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export type UserRepository = DocumentRepository<User>;
