import { Document, DocumentDefinition, PartialDocument } from '@js-chat/common';
import { DocumentRepository } from '@js-chat/repository';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

export class DocumentBaseController<
  T extends Document,
  R extends DocumentRepository<T>
> implements DocumentRepository<T> {
  documentChange$?: Observable<DocumentDefinition<T>>;

  constructor(private readonly repository: R) {}

  @Post()
  async insert(@Body() input: DocumentDefinition<T>): Promise<T> {
    return await this.repository.insert(input);
  }

  @Get()
  async find(@Query() query: PartialDocument<T>): Promise<T[]> {
    return await this.repository.find(query);
  }

  @Get('one')
  async findOne(@Query() query: PartialDocument<T>): Promise<T> {
    return await this.repository.findOne(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    return await this.repository.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: DocumentDefinition<T>,
  ): Promise<void> {
    return await this.repository.update(id, input);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
