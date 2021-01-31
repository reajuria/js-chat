import { redisEnvironment } from '@js-chat/redis-connection';
import { BullModule } from '@nestjs/bull';

export const COMMAND_QUEUE_NAME = 'commands';

export const COMMAND_QUEUE_ROOT_MODULE = BullModule.forRoot({
  redis: {
    ...redisEnvironment,
  },
});

export const COMMAND_QUEUE_REGISTER = BullModule.registerQueue({
  name: COMMAND_QUEUE_NAME,
});
