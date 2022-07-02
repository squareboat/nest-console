import "reflect-metadata";
import { SquareboatNestConsoleConstants } from "./constants";
import { CommandMetaOptions } from "./interfaces";

/**
 * Command decorator function to add a new command to CommandMeta class
 * @param command string
 * @param options Record<string, any>
 */
export function Command(command: string, options?: CommandMetaOptions) {
  options = options || ({} as CommandMetaOptions);
  return function (...args: string[] | any[]) {
    switch (args.length) {
      case 1:
        Reflect.defineMetadata(
          SquareboatNestConsoleConstants.commandName,
          command,
          args[0]
        );
        Reflect.defineMetadata(
          SquareboatNestConsoleConstants.commandOptions,
          options,
          args[0]
        );
        break;

      case 3:
        Reflect.defineMetadata(
          SquareboatNestConsoleConstants.commandName,
          command,
          args[0],
          args[1]
        );
        Reflect.defineMetadata(
          SquareboatNestConsoleConstants.commandOptions,
          options,
          args[0],
          args[1]
        );
        break;
    }
  };
}
