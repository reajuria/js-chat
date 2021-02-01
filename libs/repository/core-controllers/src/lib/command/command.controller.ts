import { Command, ObjectId } from '@js-chat/common';
import { CommandRepository, COMMAND_REPOSITORY } from '@js-chat/repository';
import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { DocumentBaseController } from '../document-controller';

@Controller('commands')
export class CommandController
  extends DocumentBaseController<Command, CommandRepository>
  implements CommandRepository {
  constructor(
    @Inject(COMMAND_REPOSITORY)
    public commandRepository: CommandRepository,
  ) {
    super(commandRepository);
  }

  @Post('execute')
  execute(
    @Body('command') command: ObjectId,
    @Query('input') input: Record<string, string>,
  ): Promise<void> {
    return this.commandRepository.execute(command, input);
  }
}
