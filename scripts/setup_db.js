#!/usr/bin/env node
const {
  yarnCmd,
  runMain,
  outro,
  runSync,
  projectName,
} = require("./setup_utils");
const dotenv = require("dotenv");

runMain(async () => {
  // Ensure server build has been run
  runSync(yarnCmd, ["workspace", "server", "build"]);

  // Source the environment
  dotenv.config({ path: `${__dirname}/../.env` });

  runSync(yarnCmd, ["workspace", "db", "p", "migrate", "reset"]);

  outro(`\
  ✅ Setup success
  🚀 To get started, run:
  ${
    projectName
      ? // Probably Docker setup
        `  export UID; ${yarnCmd} docker dev`
      : `  ${yarnCmd} dev`
  }`);
});
