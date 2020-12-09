export interface Option {
  desc?: string;
  alias?: string;
  req?: boolean;
}

export interface CommandArguments {
  [key: string]: Option;
}

export interface CommandOptions {
  desc?: string;
  args?: CommandArguments;
}
