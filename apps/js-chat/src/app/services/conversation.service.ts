import { Injectable } from '@angular/core';
import { Conversation } from '@js-chat/common';
import {
  CommandClientService,
  ConversationClientService,
  MessageClientService,
  RoomClientService,
  UserClientService,
} from '@js-chat/ng-api-client';
import { from, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  selected: Conversation;
  private selectedSubject = new Subject<Conversation>();
  selected$ = this.selectedSubject.pipe(shareReplay(1));
  selectedMessages$ = this.selected$.pipe(
    switchMap((conversation) =>
      from(this.conversationService.getMessages(conversation.id)),
    ),
  );
  conversations$ = from(this.conversationService.find({})).pipe(shareReplay(1));

  constructor(
    private configurationService: ConfigurationService,
    private conversationService: ConversationClientService,
    private commandService: CommandClientService,
    private roomService: RoomClientService,
    private messageService: MessageClientService,
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
    console.log(this.selected, this.authService.user);
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
}
