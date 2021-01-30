import { Command, ObjectId } from '@js-chat/common';
import { DocumentRepository } from '../document/document-repository.interface';

export interface CommandRepository extends DocumentRepository<Command> {
  execute(command: ObjectId, input: Record<string, string>): Promise<void>;
}
