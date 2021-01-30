import { ObjectId, OBJECTID_ERROR_LENGTH } from './object-id';

describe('ObjectId', () => {
  it('should be defined', () => {
    expect(ObjectId()).toBeDefined();
  });

  it('should have 32 chars length', () => {
    expect(ObjectId().length).toEqual(32);
  });

  it('should throw an exception on invalid input', () => {
    expect(() => ObjectId('invalid input length')).toThrowError(
      OBJECTID_ERROR_LENGTH,
    );
  });
});
