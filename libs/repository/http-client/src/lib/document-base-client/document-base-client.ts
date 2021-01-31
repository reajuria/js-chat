import { Document, DocumentDefinition, PartialDocument } from '@js-chat/common';
import { DocumentRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';

export class DocumentBaseClient<T extends Document>
  implements DocumentRepository<T> {
  constructor(
    protected readonly axios: AxiosInstance,
    private readonly repositoryPath: string,
  ) {}

  documentChange$?: Observable<DocumentDefinition<T>>;
  async insert(input: DocumentDefinition<T>): Promise<T> {
    return (await this.axios.post(this.repositoryPath, input)).data;
  }
  async find(query: PartialDocument<T>): Promise<T[]> {
    return (
      await this.axios.get(this.repositoryPath, {
        ...this.axios.defaults,
        params: query,
      })
    ).data;
  }
  async findOne(query: PartialDocument<T>): Promise<T> {
    return (
      await this.axios.get(this.repositoryPath, {
        ...this.axios.defaults,
        params: query,
      })
    ).data;
  }
  async findById(id: string): Promise<T> {
    return (await this.axios.get(`${this.repositoryPath}/${id}`)).data;
  }
  async update(id: string, input: DocumentDefinition<T>): Promise<void> {
    await this.axios.patch(`${this.repositoryPath}/${id}`, input);
    return;
  }
  async delete(id: string): Promise<void> {
    await this.axios.delete(`${this.repositoryPath}/${id}`);
    return;
  }
}
