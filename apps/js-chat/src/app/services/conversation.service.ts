import { Injectable } from '@angular/core';
import { Conversation, Message, ObjectId } from '@js-chat/common';
import {
  ConversationClientService,
  UserClientService,
} from '@js-chat/ng-api-client';
import { concat, from, Observable, of, Subject } from 'rxjs';
import { shareReplay, switchMap, takeLast } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  selected: Conversation;
  private selectedSubject = new Subject<Conversation>();
  selected$ = this.selectedSubject.pipe(shareReplay(1));
  selectedMessages$ = this.selected$.pipe(
    switchMap((conversation) =>
      concat(
        from(this.conversationService.getMessages(conversation.id)).pipe(
          switchMap((messages) => of(...messages)),
        ),
        this.getConversationMessages(conversation.id),
      ),
    ),
    takeLast(5),
    shareReplay(1),
  );
  conversations$ = from(this.conversationService.find({})).pipe(shareReplay(1));

  constructor(
    private conversationService: ConversationClientService,
    private userService: UserClientService,
    private authService: AuthService,
  ) {}

  async initDb() {
    const user1 = await this.userService.insert({
      alias: 'Rafael',
      username: 'reajuria',
    });

    const user2 = await this.userService.insert({
      alias: 'Jose',
      username: 'jose',
    });

    const conversation = new Conversation({
      participants: [user1.id, user2.id],
    });

    await this.conversationService.insert(conversation.toJSON());
  }

  async createMessage(contents: string) {
    this.conversationService.createMessage(
      this.selected.id,
      this.authService.user.id,
      contents,
    );
  }

  pickConversation(conversation) {
    this.selectedSubject.next(conversation);
    this.selected = conversation;
  }

  async getMessages() {
    return await this.conversationService.getMessages(this.selected?.id);
  }

  getConversationMessages(conversation: ObjectId) {
    return new Observable<Message>((subscriber) => {
      const subscription = io(`${environment.dataApiUrl}/${conversation}`, {
        path: `/conversations`,
        reconnectionAttempts: 5,
      }).on('message', (message) => {
        console.log(message);
        subscriber.next(new Message(message));
      });

      () => {
        subscription.off('message');
      };
    });
  }
}
