import { isEmpty, isNil } from 'lodash';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Document, DocumentDefinition, ObjectId } from '../document';
import { createMessage, Message } from '../message';
import { generateSignedRandomKey } from '../util';

export class Conversation extends Document {
  private newMessageSubject = new Subject<Message>();
  newMessage$ = this.newMessageSubject.pipe(shareReplay(1));

  readonly key: string;
  readonly participants: ObjectId[];
  updated?: number;

  constructor(input?: DocumentDefinition<Conversation>) {
    super(input);

    this.participants = isNil(input?.participants) ? [] : input.participants;
    this.key =
      isNil(input?.key) || isEmpty(input?.key)
        ? generateSignedRandomKey()
        : input.key;
    this.updated = isNil(input?.updated) ? this.timestamp : input.updated;
  }

  updateConversation() {
    this.updated = new Date().getTime();
  }

  addParticipant(user: ObjectId) {
    const userIsParticipant = this.participants.includes(user);
    if (userIsParticipant === false) {
      this.participants.push(user);
    }
  }

  removeParticipant(user: ObjectId) {
    const participantIx = this.participants.findIndex(
      (participant) => participant === user,
    );
    if (participantIx >= 0) {
      this.participants.splice(participantIx, 1);
    }
  }

  pushMessage(message: Message) {
    this.newMessageSubject.next(message);
    this.updateConversation();
  }

  createMessage(user: ObjectId, contents: string) {
    const message = createMessage(user, this.id, contents, this.key);
    this.pushMessage(message);
    return message;
  }
}
