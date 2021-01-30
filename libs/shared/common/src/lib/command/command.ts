import { Document, DocumentDefinition } from '../document';

export class Command extends Document {
  readonly name: string;
  readonly pattern?: RegExp;
  readonly label?: string;
  readonly queue: string;
  readonly defaultParams?: Record<string, string>;

  constructor(input: DocumentDefinition<Command>) {
    super(input);

    this.name = input.name;
    this.pattern = input.pattern;
    this.label = input.label;
    this.queue = input.queue;
    this.defaultParams = input.defaultParams;
  }
}
