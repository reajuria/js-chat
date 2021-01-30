import { Test, TestingModule } from '@nestjs/testing';
import { DocumentRepositoryService } from './document-repository.service';

describe('DocumentRepositoryService', () => {
  let service: DocumentRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentRepositoryService],
    }).compile();

    service = module.get<DocumentRepositoryService>(DocumentRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
