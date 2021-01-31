import { Injectable } from '@angular/core';
import {
  Conversation,
  generateSignedRandomKey,
  randomHex,
  User,
} from '@js-chat/common';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  user$ = of(
    new User({
      username: 'reajuria',
    }),
  ).pipe(shareReplay(1));

  conversations$ = new Observable((subscriber) => {
    const subscription = this.user$.subscribe((user) => {
      const conversations = [
        new Conversation({
          participants: [user.id],
          key: generateSignedRandomKey(),
        }),
        new Conversation({
          participants: [user.id],
          key: generateSignedRandomKey(),
        }),
        new Conversation({
          participants: [user.id],
          key: generateSignedRandomKey(),
        }),
      ];
      conversations.forEach((conversation) => {
        setInterval(() => {
          conversation.createMessage(user.id, randomHex(64));
        }, Math.floor(Math.random() * 9990));
      });
      subscriber.next(conversations);
    });

    return () => {
      subscription.unsubscribe();
    };
  }).pipe(shareReplay(1));

  constructor() {}
  pickConversation(conversation) {}
}
