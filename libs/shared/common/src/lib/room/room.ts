import { isNil } from 'lodash';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Document, DocumentDefinition, ObjectId } from '../document';

export class Room extends Document {
  private adminChangedSubject = new Subject<ObjectId[]>();
  adminsChanged$ = this.adminChangedSubject.pipe(shareReplay(1));

  alias: string;
  admins: ObjectId[];
  conversation: ObjectId;

  constructor(input: DocumentDefinition<Room>) {
    super(input);

    this.alias = input.alias;
    this.admins = isNil(input?.admins) ? [] : input.admins;
    this.conversation = input.conversation;
  }

  addAdmin(user: ObjectId) {
    const userIsParticipant = this.admins.includes(user);
    if (userIsParticipant === false) {
      this.admins.push(user);
      this.adminChangedSubject.next(this.admins);
    }
  }

  removeAdmin(user: ObjectId) {
    const participantIx = this.admins.findIndex(
      (participant) => participant === user,
    );
    if (participantIx >= 0 && this.admins.length > 1) {
      this.admins.splice(participantIx, 1);
      this.adminChangedSubject.next(this.admins);
    }
  }
}

export type RoomData = DocumentDefinition<Room>;
