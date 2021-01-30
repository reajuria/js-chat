import {
  decrypt,
  encrypt,
  generateSignedRandomKey,
  hmacSHA512,
} from './crypto';

describe('Crypto', () => {
  const key = generateSignedRandomKey();
  const message = 'hi';
  const payload = encrypt(message, key);

  it('should be defined', () => {
    expect(encrypt).toBeDefined();
    expect(decrypt).toBeDefined();
  });

  it('should encrypt a message', () => {
    const payloadOnSecondRound = encrypt(message, key);
    expect(payload).not.toEqual(payloadOnSecondRound);
    expect(payload).not.toEqual(message);
  });

  it('should decrypt a message', () => {
    const messageContents = decrypt(payload, key);
    expect(messageContents).toEqual(message);

    const payloadOnSecondRound = encrypt(payload, key);
    const payloadPayloadContents = decrypt(payloadOnSecondRound, key);
    expect(payload).toEqual(payloadPayloadContents);
  });

  it('should hash a payload the same', () => {
    const hash = hmacSHA512(payload, key);
    const hash2 = hmacSHA512(payload, key);
    const hash3 = hmacSHA512(payload, generateSignedRandomKey());
    expect(hash).toEqual(hash2);
    expect(hash3).not.toEqual(hash2);
  });

  it('should generate different signed random keys', () => {
    const key1 = generateSignedRandomKey();
    const key2 = generateSignedRandomKey();

    expect(key1).not.toEqual(key2);
  });
});
