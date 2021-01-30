import { generateSignedRandomKey } from '../util';
import { User, USER_ERROR_EMPTY } from './user';

describe('User', () => {
  it('should be defined', () => {
    const key = generateSignedRandomKey();
    const password = User.hashPassword('', key);
    const user = new User({ username: 'rafael', password });
    expect(user).toBeDefined();
    expect(user.username).toEqual('rafael');
    expect(user.password).toEqual(password);
  });

  it('should generate password hash', (done) => {
    const key = generateSignedRandomKey().split('.')[2];
    const password1 = User.hashPassword('', key);
    setTimeout(() => {
      const password2 = User.hashPassword('', key);
      expect(password1).toEqual(password2);
      done();
    }, 800);
  });

  it('should throw on empty username', () => {
    const key = generateSignedRandomKey();
    const password = User.hashPassword('', key);
    expect(() => {
      new User({ username: '', password });
    }).toThrow(USER_ERROR_EMPTY);
  });
});
