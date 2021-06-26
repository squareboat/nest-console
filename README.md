# Nestjs Console

Create beautiful CLI commands in your application. A simple NestJS CLI module, comes packaged with utilities.

## Table Of Content
  * [Features](#features)
  * [Installation](#installation)
  * [Getting Started](#getting-started)
  * [Creating Command](#creating-command)
    + [Class](#class)
    + [Method](#method)
  * [Defining Input](#defining-input)
    + [Options](#options)
  * [Command Console I/O](#command-console-i-o)
    + [Retrieving Passed Options](#retrieving-passed-options)
    + [Prompting for Input](#prompting-for-input)
    + [Writing Outputs](#writing-outputs)
  * [Available Commands](#available-commands)
  * [Available Options](#available-options)
  * [Contributing](#contributing)
  * [About Us](#about-us)
  * [License](#license)

## Features

- *__Quick Setup__* - Quickly setup and configure your application

- *__Utilities__* - Comes packed with utilities to let you easily interact and print.
  
- *__Beautiful Commands__* - Creating a beautiful command is as easy as creating a simple injector.

## Installation

To install the package, run

```bash
npm install @squareboat/nest-console
```

OR

```bash
yarn add @squareboat/nest-console
```

## Getting Started

Once the `cli` file is copied, you need to open the `cli` file and change the module that you need to pass in `createApplicationContext` method.

> If you are following the default project structure created by `nest` command. You don't need to do anything.

Once the added the correct module in `cli` file, you need to import the `ConsoleModule` from the package.

```typescript
import { Module } from '@nestjs/common';
import { ConsoleModule } from '@squareboat/nest-console';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConsoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Now, whatever command you create in your application will be discovered automatically.

## Creating Command

There are basically two ways through which you can define commands.

- Using the `Command` decorator on an Injectable class
- Using the `Command` decorator on an Injectable class' method.

> Remember to use the `@Injectable` decorator on the class always, else the command will not be discovered and registered.

### Class

You can create an injectable class and use `@Command` decorator on it. The package will automatically look for `handle` method inside the class.

### Method

You can use `@Command` decorator on the method.

```typescript
import { Injectable } from '@nestjs/common';
import { Command, CommandArguments, _cli } from '@squareboat/nest-console';

@Injectable()
export class AppService {
  @Command('hello', {
    desc: 'Test Command',
    args: { name: { req: false } },
  })
  sayHello(args: CommandArguments) {
    console.log(args);
    _cli.info(`Hello ${args.name || 'world'}!`);
    return;
  }
}
```

Before running the command, you need to build it first.

```bash
npm run build
```

Now, to run any command, you can simply do

```bash
node cli hello
```

## Defining Input

We understand that you may want to build commands which can be dynamic in nature, ie. you may expect some required or optional parameters from client while running the command. We have made it dead simple for you to define your input expectations.

### Options

Options are the expected inputs for each command. They are denoted by double hyphens (`--`). To define an option in your command, simply add the option in `options` method of your command.

Example:

```typescript
@Command('hello', {
  desc: 'Test Command',
  args: {
    name: { desc: 'Name of the person to be greeted!', req: true },
  },
})
```

Notice the args attribute,

1. **name** key - Is the name of the option (`--name`), this key expects an object of __OptionInterface__, which include:
   1. `desc` : Description of the option, we strongly recommend to add description to each option. (*Optional*)
   2. `req` : True, if the name is required mandatorily before running the command. (*Default: False*)

To pass array of values in any option, simply chain the option

```bash
node cli hello --name user1 --name user2
```

---

## Command Console I/O

We provide easy to use APIs to work with I/O directly from the console.

### Retrieving Passed Options

While executing command, you will need to fetch the values that you may have passed in the invocation. Your method will be passed an `args: CommandArguments` argument. You can then simply check for all the values.

### Prompting for Input

You may want to ask for input while executing a command. We provide several ways with which you can ask for inputs directly on console.

To ask for simple input from the user, you can call `ask(question: string)` method.

```typescript
import { _cli } from '@squareboat/nest-console';
const name = _cli.ask('name');
```

You may want to ask user about some secret or any password, which ideally should not get printed on the console.

```typescript
const password = await _cli.password('Enter your pasword to continue');
```

While running a command, you can also give choices to select from a defined list. For example:

```typescript
/**
 * Single choice example.
 * Returns one of the passed choices.
 */
const choice = await _cli.select(
    'Please select one superhero', // question
    ['Batman', 'Ironman'],  // choices
    false // multiple?
);


/**
 * Multiple choices example.
 * Returns an array of the selected options.
 */
const choice = await _cli.select(
    'Please select one superhero',
    ['Batman', 'Ironman'],
    true
);
```

Lastly, sometimes you may want to ask for confirmation from the user before doing any execution. You can do so by using `confirm` method.

```typescript
const confirm = await _cli.confirm('Do you really wish to continue?');
if (confirm) {
    // do your magic here
}
```

### Writing Outputs

Till now, we have seen how we can operate with differnt type of inputs on the cli. There will be scenarios when you will want to print something on the console. We provide a very easy-to-use set of APIs for your basic console outputing needs.

To print any message on the console, use `info` method

```typescript
_cli.info('Some amazing message'); // Outputs 'Some amazing message' on the console
```

Incase of an error message, use `error` method.

```typescript
_cli.error('Oops! Something went wrong.');
```

Similarly, to print any success message, use `success` method

```typescript
_cli.success('Wohoo! The command worked just fine!');
```

To print a divider on the console, simple do

```typescript
_cli.line()
```

To print a table on the console, you can use `table` method:

```typescript
// this will automatically print unicode table on the console
_cli.table([
    { name: 'User 1', designation: 'Software Engineer L1' },
    { name: 'User 2', designation: 'Software Engineer L1' },
]);
```

---

## Available Commands

We provide few commands, which will help in your day to day development process.

To list all commands available in your application, you can do

```bash
node cli list
```

`list` is a reserved command name, please don't use it in any of the commands

---

## Available Options

We provide few out-of-the-box predefined options, which you can use with each of your command.

To list all the options that your command supports/expects, simply run

```bash
node cli users:greet --options
```

`--options` is a reserved option. Please don't use it anywhere in your command

## Contributing

To know about contributing to this package, read the guidelines [here](./CONTRIBUTING.md)

## About Us

We are a bunch of dreamers, designers, and futurists. We are high on collaboration, low on ego, and take our happy hours seriously. We'd love to hear more about your product. Let's talk and turn your great ideas into something even greater! We have something in store for everyone. [☎️ 📧 Connect with us!](https://squareboat.com/contact)

## License

The MIT License. Please see License File for more information. Copyright © 2020 SquareBoat.

Made with ❤️ by [Squareboat](https://squareboat.com)
