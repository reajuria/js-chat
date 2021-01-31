import { Test, TestingModule } from '@nestjs/testing';
import { ConversationConsumerService } from './conversation-consumer.service';

describe('ConversationConsumerService', () => {
  let service: ConversationConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationConsumerService],
    }).compile();

    service = module.get<ConversationConsumerService>(
      ConversationConsumerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
