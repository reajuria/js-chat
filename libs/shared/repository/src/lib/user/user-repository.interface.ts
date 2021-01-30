import { User } from '@js-chat/common';
import { DocumentRepository } from '../document/document-repository.interface';

export type UserRepository = DocumentRepository<User>;
