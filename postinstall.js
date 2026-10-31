const fs = require("fs");
const path = require("path");
var appRoot = require("app-root-path");
const picocolors = require("picocolors");

// Copies the `cli` entry file into the app root on install.
// It must never fail the install (read-only or non-root Docker images, CI caches),
// so any error only prints how to copy the file by hand.
function handle() {
  const source = path.join(__dirname, "cli.txt");
  const target = path.join(appRoot.path, "cli");
  if (fs.existsSync(target)) {
    console.log(picocolors.blue(`➡️ ${target} already exists. Returning...`));
    console.log(picocolors.blue(`➡️ To copy the file again, copy ${source} to ${target}`));
    return;
  }

  try {
    fs.copyFileSync(source, target);
    console.log(picocolors.green(`🚀 Copied the cli file to ${target}`));
    console.log(
      picocolors.yellow("❓ To change the default module and path in cli, see https://github.com/squareboat/nest-console")
    );
  } catch (e) {
    console.warn(picocolors.yellow(`⚠️ @squareboat/nest-console could not copy the cli file to ${target}: ${e.message}`));
    console.warn(picocolors.yellow(`   Copy ${source} to ${target} yourself.`));
  }
}

handle();
