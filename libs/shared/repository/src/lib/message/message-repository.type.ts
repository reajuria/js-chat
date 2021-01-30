import { Message } from '@js-chat/common';
import { DocumentRepository } from '../document/document-repository.interface';

export type MessageModel = DocumentRepository<Message>;
