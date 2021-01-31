import { Command } from '@js-chat/common';
import { CommandRepository, COMMAND_REPOSITORY } from '@js-chat/repository';
import { Controller, Inject } from '@nestjs/common';
import { DocumentBaseController } from '../document-controller';

@Controller('commands')
export class CommandController
  extends DocumentBaseController<Command, CommandRepository>
  implements CommandRepository {
  constructor(
    @Inject(COMMAND_REPOSITORY)
    commandRepository: CommandRepository,
  ) {
    super(commandRepository);
  }

  execute(command: string, input: Record<string, string>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
