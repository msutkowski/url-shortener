#!/usr/bin/env node
const fs = require("fs");
const { spawn } = require("child_process");

const ENVFILE = `${__dirname}/../.env`;

if (!fs.existsSync(ENVFILE)) {
  console.error(
    "🛠️  Please run 'yarn setup' before running 'yarn start' or make sure you've ran: cp env.example .env"
  );
  process.exit(1);
}

spawn("yarn", ["dev"], {
  stdio: "inherit",
  env: {
    ...process.env,
    npm_config_loglevel: "silent",
  },
  shell: true,
});
