import { ObjectId } from '../document';
import { createMessage, Message } from '../message';
import { Conversation } from './conversation';

describe('Conversation', () => {
  const conversation = new Conversation();
  it('should be defined', () => {
    expect(conversation).toBeDefined();
  });

  it('should have an id', () => {
    expect(new Conversation().toJSON().id).toHaveLength(32);
  });

  it('participants should be an array', () => {
    expect(new Conversation().participants).toHaveLength(0);
  });

  it('addParticipant should increment the number of participants', () => {
    const conversation = new Conversation();
    const user = ObjectId();
    conversation.addParticipant(user);
    expect(conversation.participants).toHaveLength(1);
    conversation.addParticipant(user);
    expect(conversation.participants).toHaveLength(1);
  });

  it('removeParticipant should reduce the number of participants', () => {
    const conversation = new Conversation();
    const user = ObjectId();
    const user2 = ObjectId();
    conversation.addParticipant(user);
    expect(conversation.participants).toHaveLength(1);
    conversation.addParticipant(user2);
    expect(conversation.participants).toHaveLength(2);
    conversation.removeParticipant(user);
    expect(conversation.participants).toHaveLength(1);
    conversation.removeParticipant(user2);
    expect(conversation.participants).toHaveLength(0);
  });

  it('payload should be defined', () => {
    const conversation = new Conversation();
    expect(conversation.key).toBeDefined();
  });

  it('should emit on message push', (done) => {
    const conversation = new Conversation();
    const user1 = ObjectId();
    const user2 = ObjectId();
    conversation.addParticipant(user1);
    conversation.addParticipant(user2);
    const messages: Message[] = [];
    const subscription = conversation.newMessage$.subscribe((message) => {
      messages.push(message);
      if (messages.length === 1) {
        expect(message.user).toEqual(user1);
        expect(message.getContents(conversation.key)).toEqual('Hi');
      } else if (messages.length === 2) {
        expect(message.user).toEqual(user2);
        expect(message.getContents(conversation.key)).toEqual('Hola');
      } else if (messages.length === 3) {
        expect(message.user).toEqual(user1);
        expect(message.getContents(conversation.key)).toEqual(
          'Do you have stocks info?',
        );
        expect(conversation.updated).toBeGreaterThan(conversation.timestamp);
        done();
      }
    });

    const message1 = createMessage(
      user1,
      conversation.id,
      'Hi',
      conversation.key,
    );
    conversation.pushMessage(message1);
    const message2 = createMessage(
      user2,
      conversation.id,
      'Hola',
      conversation.key,
    );
    conversation.pushMessage(message2);
    conversation.createMessage(user1, 'Do you have stocks info?');

    subscription.unsubscribe();
  });
});
