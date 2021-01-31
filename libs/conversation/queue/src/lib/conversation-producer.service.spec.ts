import { Test, TestingModule } from '@nestjs/testing';
import { ConversationProducerService } from './conversation-producer.service';

describe('ConversationProducerService', () => {
  let service: ConversationProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationProducerService],
    }).compile();

    service = module.get<ConversationProducerService>(ConversationProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
