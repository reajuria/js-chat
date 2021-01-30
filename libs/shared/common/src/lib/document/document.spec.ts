import { Document } from './document';

describe('Document', () => {
  it('should be defined', () => {
    expect(new Document()).toBeDefined();
  });

  it('id should be defined', () => {
    expect(new Document().id).toBeDefined();
  });

  it('timestamp should be defined', () => {
    expect(new Document().timestamp).toBeLessThanOrEqual(new Date().getTime());
  });

  it('toJSON should return an object', () => {
    expect(new Document().toJSON()).toBeInstanceOf(Object);
  });

  it('toString should return JSON.stringify', () => {
    const document = new Document();
    const stringified = JSON.stringify(document.toJSON());
    expect(document.toString()).toEqual(stringified);
  });
});
