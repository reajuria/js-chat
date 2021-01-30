/* eslint-disable @typescript-eslint/ban-types */
import { Observable } from 'rxjs';
import { Document } from './document';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function | Observable<any> ? never : K;
}[keyof T];

export type DocumentDefinition<T extends Partial<Document> = Document> = Pick<
  T,
  NonFunctionPropertyNames<T>
>;
