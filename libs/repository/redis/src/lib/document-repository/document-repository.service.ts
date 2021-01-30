import {
  Document,
  DocumentDefinition,
  ObjectId,
  PartialDocument,
} from '@js-chat/common';
import { DocumentRepository } from '@js-chat/repository';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentRepositoryService<T extends Document>
  implements DocumentRepository<T> {
  documentChange$?: Observable<DocumentDefinition<T>>;
  insert(input: DocumentDefinition<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  find(query: PartialDocument<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findOne(query: PartialDocument<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  findById(id: ObjectId): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(id: ObjectId, input: DocumentDefinition<T>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: ObjectId): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
