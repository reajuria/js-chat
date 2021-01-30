import { Command } from './command';

describe('Command', () => {
  it('should be defined', () => {
    const command = new Command({
      name: 'Get stock info',
      patternString: '/stock=[\\w._-]+$',
      label: '/stock=appl.us',
      queue: 'stocks_bot',
    });
    expect(command).toBeDefined();
    expect(command.name).toBeDefined();
    expect(command.pattern).toBeDefined();
    expect(command.queue).toBeDefined();
  });

  it('pattern should match', () => {
    const command = new Command({
      name: 'Get stock info',
      patternString: '/stock=[\\w._-]+$',
      label: '/stock=appl.us',
      queue: 'stocks_bot',
    });
    const expected = expect.stringMatching(command.pattern);
    expect('/stock=').not.toEqual(expected);
    expect('/stock=tesla').toEqual(expected);
    expect('/stock=appl.us').toEqual(expected);
    expect('/stock=bitcoi n').not.toEqual(expected);
    expect('/stock=bitcoi n ').not.toEqual(expected);
    expect('/stock=b ').not.toEqual(expected);
  });
});
