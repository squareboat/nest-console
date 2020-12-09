import * as chalk from "chalk";
import { _cli } from "../helpers";
import { Command } from "../decorators";
import { CommandMeta } from "../metadata";
import { Injectable } from "@nestjs/common";
import { CommandArguments } from "../interfaces";

@Injectable()
@Command("list", {
  desc: "Command to list all the commands",
})
export class ListCommands {
  public async handle(options: CommandArguments): Promise<void> {
    const commands = CommandMeta.getAllCommands();
    const list = [];
    for (const key in commands) {
      const options = commands[key].options;
      list.push({
        command: chalk.greenBright.bold(key),
        description: options.desc,
      });
    }

    _cli.table(list);
  }
}
