const { runSync } = require("../../../scripts/lib/run");
const { basename, dirname, resolve } = require("path");
const platform = require("os").platform();

if (platform !== "win32" && !process.env.UID) {
  console.error(
    "You should run `export UID` before running 'yarn docker setup' otherwise you may end up with permissions issues."
  );
  process.exit(1);
}

async function main() {
  // Jump back through the file structure to get the name of our project.
  const projectName = basename(dirname(dirname(dirname(resolve(__dirname)))));

  // On Windows we must run 'yarn.cmd' rather than 'yarn'
  const yarnCmd = platform === "win32" ? "yarn.cmd" : "yarn";

  runSync(yarnCmd, ["workspace", "docker", "down"]);
  runSync(yarnCmd, ["workspace", "docker", "db:up"]);

  // Fix permissions
  runSync(yarnCmd, [
    "workspace",
    "docker",
    "compose",
    "run",
    "server",
    "sudo",
    "bash",
    "-c",
    "chmod o+rwx /var/run/docker.sock && chown -R node /work/node_modules /work/packages/*/node_modules",
  ]);

  runSync(yarnCmd, [
    "compose",
    "run",
    "-e",
    `PROJECT_NAME=${projectName}`,
    "server",
    "yarn",
    "install",
  ]);

  runSync(yarnCmd, [
    "compose",
    "run",
    "-e",
    `PROJECT_NAME=${projectName}`,
    "server",
    "yarn",
    "db",
    "p",
    "generate",
  ]);

  // Run setup as normal
  runSync(yarnCmd, [
    "compose",
    "run",
    "-e",
    `PROJECT_NAME=${projectName}`,
    "server",
    "yarn",
    "setup",
  ]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
