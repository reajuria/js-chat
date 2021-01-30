import { isEmpty, isFunction, isNil, omitBy } from 'lodash';
import { isObservable } from 'rxjs';
import { DocumentDefinition } from './document-definition.interface';
import { ObjectId } from './object-id';

export class Document {
  id?: ObjectId;
  timestamp?: number;

  constructor(input?: DocumentDefinition) {
    if (isNil(input?.id) || isNil(input) || isEmpty(input)) {
      this.id = ObjectId();
      this.timestamp = new Date().getTime();
    } else {
      this.id = ObjectId(input.id);
      this.timestamp = input.timestamp;
    }
  }

  toJSON() {
    return omitBy(this, (item) => {
      return isFunction(item) || isObservable(item);
    }) as DocumentDefinition<this>;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
