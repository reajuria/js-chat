import {
  Document,
  DocumentDefinition,
  ObjectId,
  PartialDocument,
} from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import { DocumentRepository } from '@js-chat/repository';
import { first, isEmpty, isNil } from 'lodash';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseEntity } from 'ts-redis-orm';

export class DocumentBaseRepository<
  T extends Document,
  E extends typeof BaseEntity
> implements DocumentRepository<T> {
  private redis = this.redisCS.getConnection();
  private redisSub = this.redisCS.createConnection(
    'sub-' + this.documentFactory.name,
  );
  documentChange$?: Observable<DocumentDefinition<T>> = fromEvent(
    this.redisSub,
    'message',
  ).pipe(
    filter(([channel, message]) => channel === this.REPOSITORY_CHANGES_KEY),
    map(([channel, message]) => JSON.parse(message) as DocumentDefinition<T>),
  );

  private REPOSITORY_CHANGES_KEY = this.getKey('changes');
  private REPOSITORY_DOCUMENT_KEY = this.getKey('documents');
  private REPOSITORY_INDEX_KEY = this.getKey('index');

  constructor(
    private readonly documentFactory: {
      new (input: DocumentDefinition<T>): T;
    },
    private readonly entity: E,
    private readonly redisCS: RedisConnectionService,
  ) {
    this.redisSub.subscribe(this.REPOSITORY_CHANGES_KEY, (err, count) => {
      // TODO
    });
  }

  private createInstance(input: DocumentDefinition<T>) {
    if (isNil(input) || isEmpty(input)) {
      return undefined;
    }
    return new this.documentFactory(input);
  }

  private getKey(id: string) {
    return `${this.documentFactory.name}::${id}`;
  }

  private async publishChange(document: T) {
    await this.redis.publish(this.REPOSITORY_CHANGES_KEY, document.toString());
  }

  async insert(input: DocumentDefinition<T>): Promise<T> {
    const document = this.createInstance(input);
    const entityDocument = this.entity.create({
      ...(document.toJSON() as any),
    });
    await entityDocument.save();
    return document;
  }
  async find(query: PartialDocument<T>): Promise<T[]> {
    const entries = Object.entries(query || {});
    let queryEx = this.entity.query();
    for (const [key, value] of entries) {
      queryEx = queryEx.where(key as any, '=', value as any);
    }
    const [results] = await queryEx.run();
    return results.map((item) => this.createInstance(item as any));
  }
  async findOne(query: PartialDocument<T>): Promise<T> {
    const entries = Object.entries(query || {});
    let queryEx = this.entity.query();
    for (const [key, value] of entries) {
      queryEx = queryEx.where(key as any, '=', value as any);
    }
    const [results] = await queryEx.limit(1).run();
    return first(results.map((item) => this.createInstance(item as any)));
  }
  async findById(id: ObjectId): Promise<T> {
    return await this.findOne({ id } as any);
  }
  async update(id: ObjectId, input: DocumentDefinition<T>): Promise<void> {
    const [results] = await this.entity
      .query()
      .where('id' as any, '=', id)
      .limit(1)
      .run();
    const result = first(results);
    if (isNil(result)) {
      return;
    }
    const value = result?.getValues();
    const newValue = Object.apply(value, input);
    result.setValues(newValue);
    await result.save();
    await this.publishChange(this.createInstance(newValue));
  }
  async delete(id: ObjectId): Promise<void> {
    const [results] = await this.entity
      .query()
      .where('id' as any, '=', id)
      .limit(1)
      .run();
    const result = first(results);
    if (isNil(result)) {
      return;
    }
    await result.delete();
  }
}
