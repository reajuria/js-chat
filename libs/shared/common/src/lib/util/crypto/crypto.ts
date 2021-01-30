import { AES, enc, HmacSHA512 } from 'crypto-js';
import { randomHex } from '../random-hex/random-hex';

export function encrypt(input: string, key: string) {
  return AES.encrypt(input, key).toString();
}
export function decrypt(input: string, key: string) {
  return AES.decrypt(input, key).toString(enc.Utf8);
}

export function hmacSHA512(payload: string, key: string) {
  return HmacSHA512(payload, key).toString(enc.Hex);
}

export function generateSignedRandomKey(
  key: string = randomHex(64),
  length = 512,
) {
  const header = length.toString();
  const payload = randomHex(length);
  const hash = hmacSHA512(payload, key);
  return `${header}.${payload}.${hash}`;
}
