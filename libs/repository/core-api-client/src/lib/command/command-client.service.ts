import { Command } from '@js-chat/common';
import { CommandRepository, COMMAND_REPOSITORY } from '@js-chat/repository';
import { Inject, Injectable } from '@nestjs/common';
import { DocumentBaseClient } from '../document-base-client';

@Injectable()
export class CommandClientService
  extends DocumentBaseClient<Command, CommandRepository>
  implements CommandRepository {
  constructor(
    @Inject(COMMAND_REPOSITORY) commandRepository: CommandRepository,
  ) {
    super(commandRepository);
  }
  execute(command: string, input: Record<string, string>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
