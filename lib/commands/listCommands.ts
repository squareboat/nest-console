import { Injectable } from "@nestjs/common";
import * as chalk from "chalk";
import { Command, CommandArguments, CommandMeta, _cli } from "..";

@Injectable()
@Command("list", {
  desc: "Command to list all the commands",
})
export class ListCommands2 {
  public async handle(options: CommandArguments): Promise<void> {
    const commands = CommandMeta.getAllCommands();
    const list = [];
    const keys = Object.keys(commands).sort().reverse();

    const commandGroups: { [key: string]: string[] } = { "#": [] };
    for (const key of keys) {
      const c = key.split(":");

      if (c.length === 1) {
        if (commandGroups[c[0]]) {
          commandGroups[c[0]].push(key);
        } else {
          commandGroups["#"].push(c[0]);
        }
      } else {
        if (commandGroups[c[0]]) {
          commandGroups[c[0]].push(key);
        } else {
          commandGroups[c[0]] = [key];
        }
      }
    }

    for (const group in commandGroups) {
      _cli.success(chalk.bgBlue.whiteBright.bold(" " + group + " "));
      const list = [];
      const sortedCommands = commandGroups[group].sort();
      for (const command of sortedCommands) {
        const options = commands[command].options || {};
        list.push({
          command: chalk.greenBright.bold(command),
          description: options.desc || "Command Description",
        });
      }

      _cli.table(list);
    }
  }
}
