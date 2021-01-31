import { isEmpty, isNil } from 'lodash';
import { Document, DocumentDefinition } from '../document';
import { hmacSHA512 } from '../util';

export const USER_ERROR_EMPTY = 'Username should not be empty';

export class User extends Document {
  static hashPassword(password: string, key: string) {
    // Using hmac to keep it simple :)
    return hmacSHA512(password, key);
  }

  alias: string;
  username: string;
  password?: string;

  constructor(input: DocumentDefinition<User>) {
    super(input);

    if (isNil(input.username) || isEmpty(input?.username)) {
      throw USER_ERROR_EMPTY;
    }

    this.alias = input.alias;
    this.username = input.username;
    this.password = input.password;
  }
}

export type UserData = DocumentDefinition<User>;
