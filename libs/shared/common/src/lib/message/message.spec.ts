import { ObjectId } from '../document';
import { generateSignedRandomKey } from '../util';
import { createMessage } from './create-message';
import { Message } from './message';

describe('Message | createMessage', () => {
  it('should be defined', () => {
    expect(
      new Message({ conversation: ObjectId(), user: ObjectId(), payload: '' }),
    ).toBeDefined();
  });

  it('should create a message', () => {
    const user = ObjectId();
    const conversation = ObjectId();
    const conversationKey = generateSignedRandomKey();
    const userInput = 'Hi, this is John';
    const message = createMessage(
      user,
      conversation,
      userInput,
      conversationKey,
    );

    expect(message).toBeInstanceOf(Message);
    expect(message.id).toBeDefined();
    expect(message.timestamp).toBeDefined();
    expect(message.conversation).toEqual(conversation);
    expect(message.user).toEqual(user);
    expect(message.getContents(conversationKey)).toEqual(userInput);
  });

  it('should not create a empty message', () => {
    const user = ObjectId();
    const conversation = ObjectId();
    const conversationKey = generateSignedRandomKey();
    const userInput = '';
    const message = createMessage(
      user,
      conversation,
      userInput,
      conversationKey,
    );

    expect(message).toBeUndefined();
  });
});
