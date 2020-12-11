const fs = require("fs");
var appRoot = require("app-root-path");
const chalk = require("chalk");

function handle() {
  const path = `${appRoot.path}/cli`;
  if (fs.existsSync(path)) {
    console.log(chalk.blue`➡️ ${path} already exists. Returning...`);
    console.log(
      chalk.blue`➡️ To copy file, copy from ${chalk.white(
        process.cwd() + "/cli.js"
      )} to ${chalk.white(path)}`
    );
    return;
  }

  fs.copyFile("./cli.txt", `${appRoot.path}/cli`, (err) => {
    if (err) throw err;
    console.log(chalk.green`🚀 Copying cli.js file to ${appRoot.path}/cli`);
    console.log(
      chalk.yellow`❓ To know more about on how to change default module and path in cli, go to https://squareboat.com/open-source/nest-console/config`
    );
  });
}

handle();
