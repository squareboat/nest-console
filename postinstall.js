const fs = require("fs");
var appRoot = require("app-root-path");
const picocolors = require("picocolors");

function handle() {
  const path = `${appRoot.path}/cli`;
  if (fs.existsSync(path)) {
    console.log(picocolors.blue`➡️ ${path} already exists. Returning...`);
    console.log(
      picocolors.blue`➡️ To copy file, copy from ${picocolors.white(
        process.cwd() + "/cli.js"
      )} to ${picocolors.white(path)}`
    );
    return;
  }

  fs.copyFile("./cli.txt", `${appRoot.path}/cli`, (err) => {
    if (err) throw err;
    console.log(
      picocolors.green`🚀 Copying cli.js file to ${appRoot.path}/cli`
    );
    console.log(
      picocolors.yellow`❓ To know more about on how to change default module and path in cli, go to https://github.com/squareboat/nest-console`
    );
  });
}

handle();
