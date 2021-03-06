import { Inject, Injectable } from '@angular/core';
import { Command } from '@js-chat/common';
import { CommandRepository, COMMAND_REPOSITORY } from '@js-chat/repository';
import { DocumentBaseClient } from '../document-base-client';

@Injectable({
  providedIn: 'root',
})
export class CommandClientService
  extends DocumentBaseClient<Command, CommandRepository>
  implements CommandRepository {
  constructor(
    @Inject(COMMAND_REPOSITORY) public commandRepository: CommandRepository,
  ) {
    super(commandRepository);
  }
  execute(command: string, input: Record<string, string>): Promise<void> {
    return this.commandRepository.execute(command, input);
  }
}
