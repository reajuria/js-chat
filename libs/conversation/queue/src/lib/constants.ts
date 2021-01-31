import { redisEnvironment } from '@js-chat/redis-connection';
import { BullModule } from '@nestjs/bull';

export const CONVERSATION_QUEUE_NAME = 'conversations';

export const CONVERSATION_QUEUE_ROOT_MODULE = BullModule.forRoot({
  redis: {
    ...redisEnvironment,
  },
});

export const CONVERSATION_QUEUE_REGISTER = BullModule.registerQueue({
  name: CONVERSATION_QUEUE_NAME,
});
