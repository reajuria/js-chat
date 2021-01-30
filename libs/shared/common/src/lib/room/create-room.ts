import { Conversation } from '../conversation';
import { ObjectId } from '../document';
import { Room } from './room';

export function createRoom(
  alias: string,
  admin: ObjectId,
  conversation: Conversation,
) {
  return new Room({
    alias,
    admins: [admin],
    conversation: conversation.id,
  });
}
