import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Document, DocumentDefinition, ObjectId } from '../document';
import { decrypt } from '../util';

export class Message extends Document {
  private sentMessageSubject = new Subject<boolean>();
  sent$ = this.sentMessageSubject.pipe(shareReplay(1));

  readonly user: ObjectId;
  readonly conversation: ObjectId;
  readonly payload: string;
  sent? = false;

  constructor(input: DocumentDefinition<Message>) {
    super(input);

    this.user = input.user;
    this.conversation = input.conversation;
    this.payload = input.payload;
    this.sent = input?.sent || false;
  }

  getContents(key: string) {
    return decrypt(this.payload, key);
  }

  markAsSent() {
    this.sent = true;
    this.sentMessageSubject.next(this.sent);
  }
}
