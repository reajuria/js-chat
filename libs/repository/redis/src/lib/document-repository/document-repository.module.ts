import { Module } from '@nestjs/common';
import { DocumentRepositoryService } from './document-repository.service';

@Module({
  providers: [DocumentRepositoryService]
})
export class DocumentRepositoryModule {}
