import { isEmpty, isNil } from 'lodash';
import { randomHex } from '../util';

export type ObjectId = string;

export const OBJECTID_ERROR_LENGTH =
  "the ObjectId provided doesn't match the required length";

export function ObjectId(input?: string): ObjectId {
  if (isNil(input) || isEmpty(input)) {
    return randomHex(16) as ObjectId;
  } else if (input.length === 32) {
    return input as ObjectId;
  } else {
    throw new Error(OBJECTID_ERROR_LENGTH);
  }
}
