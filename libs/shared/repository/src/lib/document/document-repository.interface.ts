import {
  Document,
  DocumentDefinition,
  ObjectId,
  PartialDocument,
} from '@js-chat/common';
import { Observable } from 'rxjs';

export interface DocumentRepository<
  T extends Document,
  D = DocumentDefinition<T>,
  Q = PartialDocument<T>
> {
  documentChange$?: Observable<D>;
  insert(input: D): Promise<T>;
  find(query: Q): Promise<T[]>;
  findOne(query: Q): Promise<T>;
  findById(id: ObjectId): Promise<T>;
  update(id: ObjectId, input: D): Promise<void>;
  delete(id: ObjectId): Promise<void>;
}
