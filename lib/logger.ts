import * as pc from "picocolors";
import Table from "cli-table3";

export class Logger {
  /**
   * Use this method to print an information line
   * @param msg
   * @returns void
   */
  public static info(msg: string): void {
    console.log(pc.cyan(msg));
  }

  /**
   * Use this method to print an information line
   * @param msg
   * @returns void
   */
  public static warn(msg: string): void {
    console.log(pc.yellow(msg));
  }

  /**
   * Use this method to print an error message
   * @param msg
   * @returns void
   */
  static error(msg: string): void {
    console.log(pc.bgRed(pc.bold(msg)));
  }

  /**
   * Use this method to print a line.
   * Prints line half the width of the console
   * @returns void
   */
  static line(): void {
    console.log(pc.gray("-".repeat(process.stdout.columns / 2)));
  }

  /**
   * Use this method to print a success message
   * @param msg
   * @returns void
   */
  static success(msg: string) {
    console.log(pc.green(msg));
  }

  /**
   * Use this function to print table in console
   * @param rows
   * @param options
   * @returns void
   */
  static table(rows: Record<string, any>[]): void {
    let columns: string[] = [];
    for (const row of rows) {
      columns = columns.concat(Object.keys(row));
    }
    columns = [...new Set(columns)];
    const uniqueCols = [];
    for (const col of columns) {
      uniqueCols.push(
        pc.cyan(pc.bold(col.charAt(0).toUpperCase() + col.slice(1)))
      );
    }

    const pRows: any[] = [];
    rows.forEach((r) =>
      pRows.push(
        Object.values(r).map((e) => (e && e.toString && e.toString()) || "")
      )
    );

    const p = new Table({ head: uniqueCols });
    p.push(...pRows);

    console.log(p.toString());
  }
}
