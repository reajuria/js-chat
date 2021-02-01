import { Document, DocumentDefinition, PartialDocument } from '@js-chat/common';
import { DocumentRepository } from '@js-chat/repository';
import { Observable } from 'rxjs';

export class DocumentBaseClient<
  T extends Document,
  R extends DocumentRepository<T>
> implements DocumentRepository<T> {
  documentChange$?: Observable<DocumentDefinition<T>> = this.repository
    .documentChange$;

  constructor(private readonly repository: R) {}

  async insert(input: DocumentDefinition<T>): Promise<T> {
    return await this.repository.insert(input);
  }

  async find(query: PartialDocument<T>): Promise<T[]> {
    return await this.repository.find(query);
  }

  async findOne(query: PartialDocument<T>): Promise<T> {
    return await this.repository.findOne(query);
  }

  async findById(id: string): Promise<T> {
    return await this.repository.findById(id);
  }

  async update(id: string, input: DocumentDefinition<T>): Promise<void> {
    return await this.repository.update(id, input);
  }

  async delete(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
