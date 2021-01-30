import { randomHex } from './random-hex';

describe('randomHex', () => {
  it('should return a 32 char string', () => {
    expect(randomHex()).toHaveLength(32);
  });

  it('should return a 2 char string when length is 0', () => {
    expect(randomHex(0)).toHaveLength(2);
  });

  it('should return a string doubling the specified length', () => {
    expect(randomHex(32)).toHaveLength(64);
  });
});
