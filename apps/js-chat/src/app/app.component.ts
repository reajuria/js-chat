import { Component } from '@angular/core';
import { Conversation, randomHex } from '@js-chat/common';
import { reverse, sortBy } from 'lodash';
import { map, shareReplay } from 'rxjs/operators';
import { ConversationService } from './services/conversation.service';

@Component({
  selector: 'js-chat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public conversationService: ConversationService) {}

  trackConversations = (conversation: Conversation) => conversation.id;

  random() {
    return randomHex(2);
  }

  sortConversations(conversations: Conversation[]) {
    return reverse(sortBy(conversations, 'updated'));
  }

  lastMessage(conversation: Conversation) {
    return conversation.newMessage$.pipe(
      map((message) => message.getContents(conversation.key)),
      shareReplay(1),
    );
  }
}
