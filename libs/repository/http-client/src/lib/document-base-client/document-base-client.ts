import { Document, DocumentDefinition, PartialDocument } from '@js-chat/common';
import { DocumentRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

export class DocumentBaseClient<T extends Document, D = DocumentDefinition<T>>
  implements DocumentRepository<T> {
  documentChange$?: Observable<DocumentDefinition<T>> = new Observable(
    (subscriber) => {
      const subscription = io(`${this.axios.defaults.baseURL}`, {
        path: `/${this.repositoryPath}`,
        reconnectionAttempts: 5,
      }).on('message', (change) => {
        subscriber.next(change);
      });

      () => {
        subscription.off('message');
      };
    },
  );

  constructor(
    protected readonly axios: AxiosInstance,
    private readonly repositoryPath: string,
    private readonly documentFactory: {
      new (input: D): T;
    },
  ) {}

  private createInstance(input: D) {
    return new this.documentFactory(input);
  }

  async insert(input: DocumentDefinition<T>): Promise<T> {
    const document = (await this.axios.post<D>(this.repositoryPath, input))
      .data;
    return this.createInstance(document);
  }
  async find(query: PartialDocument<T>): Promise<T[]> {
    const documents = (
      await this.axios.get<D[]>(this.repositoryPath, {
        ...this.axios.defaults,
        params: query,
      })
    ).data;

    return documents?.map((document) => this.createInstance(document));
  }
  async findOne(query: PartialDocument<T>): Promise<T> {
    const document = (
      await this.axios.get<D>(this.repositoryPath, {
        ...this.axios.defaults,
        params: query,
      })
    ).data;
    return this.createInstance(document);
  }
  async findById(id: string): Promise<T> {
    const document = (await this.axios.get(`${this.repositoryPath}/${id}`))
      .data;
    return this.createInstance(document);
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
