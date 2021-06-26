import chalk = require("chalk");
import { except, _cli } from "./helpers";

export class CommandRunner {
  static async handle(
    command: Record<string, any>,
    args: Record<string, any>
  ): Promise<void> {
    const options = command.options.args || {};
    const requiredOptions = Object.keys(options).filter((k) => options[k].req);
    const noInputFound = [];
    for (const option of requiredOptions) {
      if (!args[option]) noInputFound.push(option);
    }

    if (noInputFound.length) {
      _cli.error(` Missing arguments: ${noInputFound.join(", ")} `);
      return;
    }

    args = except(args, ["_", "$0", "command"]);
    if (args.options) {
      return CommandRunner.printOptions(command, args);
    }

    await command.target(args);
    return;
  }

  static printOptions(command: Record<string, any>, args: Record<string, any>) {
    const options = command.options.args || {};
    const commandOptions = [];
    for (const key in options) {
      commandOptions.push({
        name: key,
        description: options[key].desc,
        required: options[key].req ? "Y" : "",
      });
    }

    _cli.info(chalk.bgBlue.whiteBright.bold(" Options "));

    if (commandOptions.length) {
      _cli.table(commandOptions);
    } else {
      _cli.info("No option found for specified command");
    }
  }
}
