import { Conversation, Message, MessageData, ObjectId } from '@js-chat/common';
import { ConversationRepository } from '@js-chat/repository';
import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
import { DocumentBaseClient } from '../document-base-client';

export class ConversationHttpClient
  extends DocumentBaseClient<Conversation>
  implements ConversationRepository {
  constructor(public readonly axios: AxiosInstance) {
    super(axios, '/conversations', Conversation);
  }
  newMessage$: Observable<Message>;

  async createMessage(
    conversation: ObjectId,
    user: ObjectId,
    contents: string,
  ): Promise<Message> {
    return new Message(
      (
        await this.axios.post<MessageData>('/conversations/message', {
          conversation,
          user,
          contents,
        })
      ).data,
    );
  }

  async getMessages(conversation: ObjectId): Promise<Message[]> {
    const messages = (
      await this.axios.get<MessageData[]>('/conversations/messages', {
        params: { conversation },
      })
    ).data;

    return messages.map((message) => new Message(message));
  }

  async pushServiceMessage(
    conversation: Conversation,
    message: Message,
  ): Promise<void> {
    await this.axios.post('/conversations/service-message', {
      conversation,
      message,
    });
  }
}
