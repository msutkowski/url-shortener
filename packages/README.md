# @app/config

This package contains shared configuration between the entire project.

## Configuration settings

In [src/index.ts](src/index.ts) you'll find examples of some settings that could
be used throughout the app:

- `fromEmail` - the email address to send emails from.
- `awsRegion` - used for sending emails with Amazon SES.
- `projectName` - sourced from `package.json`; the name of this project!
- `companyName` - for copyright ownership.
- `emailLegalText` - legal text to put at the bottom of emails. Since all emails
  in this project are transactional, an `unsubscribe` link is not needed, but
  you should definitely consider how you intend to handle complaints

## Environmental variables

In order to support multiplatform and docker development in the same repository,
we use `node -r @app/config/env path/to/code` to run various parts of the
project. `node -r` requires a specific module before running the main script; in
this case we're requiring [@app/config/env.js](./env.js) which sources the
settings from `.env` in the root folder and then builds some derivative
environmental variables from them.
