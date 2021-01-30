import { Module } from '@nestjs/common';
import { DocumentRepositoryModule } from './document-repository/document-repository.module';

@Module({
  imports: [DocumentRepositoryModule],
})
export class RedisRepositoryModule {}
