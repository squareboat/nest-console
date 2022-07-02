import { ConsoleIO } from "../consoleIO";

export type GenericFunction = (...args: any[]) => any;

export interface CommandMetaOptions {
  desc?: string;
}

export interface CommandObject extends ArgumentParserOutput {
  target: (cli: ConsoleIO) => Promise<void>;
  expression: string;
  meta: CommandMetaOptions;
}

export interface ArgumentOptionObject {
  name: string;
  isRequired: boolean;
  isArray: boolean;
  defaultValue: string | boolean;
  expression: string;
}

export interface ArgumentParserOutput {
  name: string;
  arguments: ArgumentOptionObject[];
  options: ArgumentOptionObject[];
  meta: CommandMetaOptions;
}
