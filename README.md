## Overview

This is a full-stack [Nest](https://nestjs.com/) and
[React](https://reactjs.org/) project. The frontend uses the
[Chakra](https://chakra-ui.com/) design framework to accelerate development. The
entire stack is written in TypeScript, with an auto-generated API client for
React consumption _(useXQuery, useXMutation)_ by leveraging
[redux-toolkit/query](https://redux-toolkit.js.org/rtk-query/overview) and
[rtk-query-codgen](https://github.com/rtk-incubator/rtk-query-codegen).

### Development

Requires:

- [`docker`](https://docs.docker.com/install/)
- [`docker-compose`](https://docs.docker.com/compose/install/)
- Ensure you've allocated Docker **at least** 4GB of RAM for development - but
  the more the better :)

## Getting started

This project is designed to work with `yarn`. If you don't have `yarn`
installed, you can install it with `npm install -g yarn`. The Docker setup
already has `yarn` & `npm` installed and configured.

To get started, please run:

```sh
cp env.example .env # you should change the db password here, but optional as we're in a no-risk temporary container
yarn install
export UID; yarn docker setup # if the container fails to come up, run `export UID; yarn docker up`, then rerun setup
export UID; yarn docker dev # or alternatively, you can open the project in vscode and connect to the remote container at this point. See more info below
yarn dev # once inside the dev prompt of the container.
```

At this point, Nest and CRA will both start and the app will be accessible here:

- **Client:** http://localhost:5678/
- **API:** http://localhost:5679/

**NOTE:** `export UID` is important on Linux Docker hosts, otherwise the files
and folders created by Docker will end up owned by root, which is non-optimal.
For ease of long-term use, you should add `export UID` to your `~/.profile` or
`~/.zshrc` etc.

Once docker is setup, you can run tests, lint, etc by connecting to the server:

```sh
export UID; yarn docker dev # skip this if you're in the remote container
# once connected in a bash terminal
yarn install
yarn lint
# run server tests
yarn server test
# run client tests
yarn client test
```

Optionally, I would recommend using the vscode remote containers to connect to
the container. Once started, you'll be in a shell and a full IDE on the remote.

### Further development

#### Writing any new code

Use the devcontainer
[as mentioned in the packages/docker/README](./packages/docker/README.md) to
avoid potential file permissions issues. Each OS is different, and this can
cause many headaches. The other alternative is to just run the database in
detached mode and then develop locally.

#### Generating a new API client for React apps

If you introduce new routes that you need to consume on the client, you can run
`yarn client generate:api-client` - just make sure that your nest dev server is
running and the swagger docs are reachable
([more info](./packages/server/README.md#swagger)). It's a good idea to make
sure your swagger docs look good before doing this - but it's not necessary. For
brevity's sake, this project currently modifies the `operationId` to have better
named hooks (eg: `useCreateLinkMutation` instead of
`useLinkController_CreateLinkMutation`)

#### Updating DB schemas, running migrations, and generating clients

If you modify the prisma schema, you will need to `yarn db p migrate dev` to
create and run a migration, then most likely `yarn db p generate` to update the
prisma client. If you do not see the changes reflect in your types, you _may_
need to run `yarn install` again. In the long term, this issue would be solved
by bumping versions in the `db` package when the schema changes, and linking
that version in the `server` package.

#### Troubleshooting

If you run into file permissions issues for whatever reason, these commands
should help bail you out:

```
chmod -R a+rX,u+rwX .
chown yourusername:yourgroup -R .
```

> a+rX,u+rwX - for all, add read permissions and set execute on folders, for
> user add read and write and set execute on folders

### Todos

- [] API/Client: Real e2e tests
- [] Cypress
- [] API: Error handling and standardization (errors should be piped into a
  format with a message property, validation errors, etc)
- [x] API: Simple logging example
