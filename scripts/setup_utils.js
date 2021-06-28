if (parseInt(process.version.split(".")[0], 10) < 10) {
  throw new Error("This project requires Node.js >= 10.0.0");
}
const { runSync } = require("./lib/run");

// fixes runSync not throwing ENOENT on windows
const platform = require("os").platform();
const yarnCmd = platform === "win32" ? "yarn.cmd" : "yarn";

const projectName = process.env.PROJECT_NAME;

exports.runSync = runSync;
exports.yarnCmd = yarnCmd;
exports.projectName = projectName;

exports.runMain = (main) => {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
};

exports.outro = (message) => {
  console.log();
  console.log();
  console.log("____________________________________________________________");
  console.log();
  console.log();
  console.log(message);
  console.log();
  console.log();
  console.log("              Let's work together!");
  console.log("          https://github.com/msutkowski");
  console.log();
  console.log("____________________________________________________________");
  console.log();
};
