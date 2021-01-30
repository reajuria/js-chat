import { enc, lib } from 'crypto-js';

export function randomHex(length = 16) {
  return lib.WordArray.random(length || 1).toString(enc.Hex);
}
