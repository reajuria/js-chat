import { isNil } from 'lodash';
import { Document, DocumentDefinition } from '../document';

export class Command extends Document {
  readonly name: string;
  readonly pattern?: RegExp;
  readonly patternString?: string;
  readonly label?: string;
  readonly queue: string;
  readonly defaultParams?: Record<string, string>;

  constructor(input: DocumentDefinition<Command>) {
    super(input);

    this.name = input.name;
    this.pattern =
      isNil(input.patternString) === false
        ? new RegExp(input?.patternString, 'i')
        : undefined;
    this.patternString = input.patternString;
    this.label = input.label;
    this.queue = input.queue;
    this.defaultParams = input.defaultParams;
  }
}

export type CommandData = DocumentDefinition<Command>;
