import { Test, TestingModule } from '@nestjs/testing';
import { CommandConsumerService } from './command-consumer.service';

describe('CommandConsumerService', () => {
  let service: CommandConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandConsumerService],
    }).compile();

    service = module.get<CommandConsumerService>(CommandConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
