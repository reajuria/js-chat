import { Message } from '@js-chat/common';
import { RedisConnectionService } from '@js-chat/redis-connection';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  path: '/conversations',
  namespace: /\/.*/,
  serveClient: false,
})
export class ConversationGateway implements OnGatewayConnection {
  redis = this.redisService.createConnection('conversation-sub');
  @WebSocketServer() ns: Namespace;
  constructor(private redisService: RedisConnectionService) {
    this.redis.psubscribe('conversation-message:*').then(() => {
      this.redis.on('pmessage', (pattern, channel, messageContents) => {
        const message = new Message(JSON.parse(messageContents));
        this.ns.server
          .of(`/api/${message.conversation}`)
          .to('messages')
          .send(message);
      });
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    const namespace = client.nsp.name.replace('/api', '');
    console.log(namespace);
    client.join('messages');
    // client.
    // client.join();
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
