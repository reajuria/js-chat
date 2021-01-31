import { Message } from '@js-chat/common';
import { DocumentRepository } from '../document/document-repository.interface';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';

export type MessageRepository = DocumentRepository<Message>;
