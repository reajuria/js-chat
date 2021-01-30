/* eslint-disable @typescript-eslint/ban-types */
import { Observable } from 'rxjs';
import { Document } from './document';

export type DocumentFields<T extends Document> = {
  [K in keyof T]: T[K] extends Function | Observable<any> | RegExp ? never : K;
}[keyof T];

export type DocumentDefinition<T extends Document> = {
  [K in keyof Pick<T, DocumentFields<T>>]: T[K];
};

export type PartialDocument<T extends Document> = {
  [K in keyof Partial<Pick<T, DocumentFields<T>>>]: T[K];
};
