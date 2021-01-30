import { ObjectId } from '../document';
import { Room } from './room';

describe('Room', () => {
  it('should be defined', () => {
    expect(
      new Room({
        admins: [ObjectId()],
        alias: 'Random',
        conversation: ObjectId(),
      }),
    ).toBeDefined();
  });

  it('should emit on admin addition', (done) => {
    const admin1 = ObjectId();
    const admin2 = ObjectId();
    const room = new Room({
      admins: [admin1],
      alias: 'Random',
      conversation: ObjectId(),
    });
    const subscription = room.adminsChanged$.subscribe((admins) => {
      expect(admins).toHaveLength(2);
      done();
    });
    room.addAdmin(admin2);
    expect(room.admins).toHaveLength(2);
    room.addAdmin(admin2);
    expect(room.admins).toHaveLength(2);
    subscription.unsubscribe();
  });

  it('should emit on admin removal', (done) => {
    const admin1 = ObjectId();
    const admin2 = ObjectId();
    const room = new Room({
      admins: [admin1, admin2],
      alias: 'Random',
      conversation: ObjectId(),
    });
    const subscription = room.adminsChanged$.subscribe((admins) => {
      expect(admins).toHaveLength(1);
      done();
    });
    room.removeAdmin(admin1);
    expect(room.admins).toHaveLength(1);
    room.removeAdmin(admin1);
    expect(room.admins).toHaveLength(1);
    subscription.unsubscribe();
  });
});
