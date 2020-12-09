import { Inquirer } from "./inquirer";
import { Logger } from "./logger";

export const _cli = {
  /**
   * Use this method to print an information line
   * @param msg
   * @returns void
   */
  info: (msg: string, color?: string) => Logger.info(msg, color),

  /**
   * Use this method to print an error message
   * @param msg
   * @returns void
   */
  error: (msg: string) => Logger.error(msg),

  /**
   * Use this method to print a success message
   * @param msg
   * @returns void
   */
  success: (msg: string) => Logger.success(msg),

  /**
   * Use this method to print a line.
   * Prints line half the width of the console
   * @returns void
   */
  line: () => Logger.line(),
  /**
   * Use this function to print table in console
   * @param rows
   * @param options
   * @returns void
   */
  table: (rows: Record<string, any>[]) => Logger.table(rows),

  /**
   * Use this method to ask the client about any input.
   * @param question
   * @returns Promise<string>
   */
  ask: async (question: string) => Inquirer.ask(question),

  /**
   * Use this method to let the client select option from given choices
   * @param question
   * @param choices
   * @returns Promise<string>
   */
  select: (question: string, choices: string[], multiple = false) =>
    Inquirer.select(question, choices, multiple),

  /**
   * Use this method to ask for confirmation from the client
   * @param question
   */
  confirm: (question: string) => Inquirer.confirm(question),

  /**
   * Use this method to ask for a password/hidden input from the client
   * @param question
   * @param mask
   */
  password: (question: string, mask = "") => Inquirer.password(question, mask),
};

/**
 * Pick all keys except explicitly mentioned from any object
 *
 * @param value
 */
export function except(
  obj: Record<string, any>,
  keys: Array<string>
): Record<string, any> {
  const _obj = {};

  for (const key of Object.keys(obj)) {
    if (keys.includes(key)) continue;
    (_obj as Record<string, any>)[key] = obj[key];
  }

  return _obj;
}
