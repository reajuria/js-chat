import { Component, OnInit } from '@angular/core';
import { Command } from '@js-chat/common';
import {
  CommandClientService,
  RoomClientService,
  UserClientService,
} from '@js-chat/ng-api-client';
import { isEmpty, isNil } from 'lodash';
import { from } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'js-chat-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
})
export class ConversationPageComponent implements OnInit {
  commands: Command[] = [];

  conversationTitle$ = this.conversationService.selected$.pipe(
    switchMap((conversation) => {
      if (
        isNil(conversation.room) === false &&
        isEmpty(conversation.room) === false
      ) {
        return from(this.roomService.findById(conversation.room)).pipe(
          map((room) => room.alias),
        );
      } else {
        return from(
          this.userService.findById(conversation.participants[1]),
        ).pipe(map((user) => user.alias));
      }
    }),
    shareReplay(1),
  );

  constructor(
    public conversationService: ConversationService,
    public authService: AuthService,
    private roomService: RoomClientService,
    private userService: UserClientService,
    private commandService: CommandClientService,
  ) {
    commandService.find({}).then((commands) => {
      console.log(commands);
      this.commands = [
        ...commands.filter(
          (command) =>
            isNil(command.patternString) === false &&
            isEmpty(command.patternString) === false,
        ),
      ];
    });
  }

  async createMessage(contents: string) {
    const command = this.commands.find((command) => {
      console.log(command);
      return command.pattern.test(contents);
    });
    if (isNil(command) === false) {
      this.commandService.execute(command.id, {
        conversation: this.conversationService.selected.id,
        contents,
      });
    } else {
      await this.conversationService.createMessage(contents);
    }
  }

  ngOnInit(): void {}
}
