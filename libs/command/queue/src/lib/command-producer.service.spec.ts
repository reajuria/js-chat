import { Test, TestingModule } from '@nestjs/testing';
import { CommandProducerService } from './command-producer.service';

describe('CommandProducerService', () => {
  let service: CommandProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandProducerService],
    }).compile();

    service = module.get<CommandProducerService>(CommandProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
