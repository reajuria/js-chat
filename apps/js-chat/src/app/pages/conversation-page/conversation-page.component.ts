import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'js-chat-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
})
export class ConversationPageComponent implements OnInit {
  constructor(public conversationService: ConversationService) {}

  ngOnInit(): void {}
}
