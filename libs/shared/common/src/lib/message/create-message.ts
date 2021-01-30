import { isEmpty, isNil } from 'lodash';
import { ObjectId } from '../document';
import { encrypt } from '../util';
import { Message } from './message';

export function createMessage(
  user: ObjectId,
  conversation: ObjectId,
  message: string,
  key: string,
) {
  if (isNil(message) || isEmpty(message)) {
    return undefined;
  }
  const payload = encrypt(message, key);
  return new Message({
    user,
    conversation,
    payload,
  });
}
