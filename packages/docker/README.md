# Docker mode

## Docker development notes

If you don't `export UID` then Docker on Linux may create the files and folders
as root. We strongly advise you `export UID`.

PostgreSQL logs from Docker on stdout can be overwhelming, so we recommend to
only start the `db` services in detached mode: `docker-compose up -d db`.

To see logs on your `stdout` you can use: `docker-compose logs db`

### Explanation:

The docker environment (`docker-compose.yml`) is set up so you can almost work
with this repo like you would directly.

There is a `server` docker-compose service which has `node` and `yarn` already
installed. Once you've run `yarn docker setup` you can simply start it via
`docker-compose up`, or use the the alias `yarn docker start`, which does some
more useful stuff as well. The `yarn docker` commands are provided by
`packages/docker/package.json`.

**NOTE (for Windows)**: For _hot-reloading_ to work, you may need to install and
run
[docker-volume-watcher](https://github.com/merofeev/docker-windows-volume-watcher)

#### Connecting with a database tool:

To connect to the container database with psql or another database tool, use
port 14391 on localhost and populate the `DATABASE_NAME`, `DATABASE_OWNER` and
`DATABASE_PASSWORD` from the DATABASE_URL in your `.env` file:

```bash
$ psql "postgres://$DATABASE_OWNER:$DATABASE_PASSWORD@localhost:14391/$DATABASE_NAME"
```

#### Usage example:

> Attach to `dev`, run `yarn db commit` to commit the latest migration, then
> keep on developing on the React client with hot reloading:

```sh
# make sure everything is ready to start and no ports are blocked
# start dev (and linked db) service in detached mode (so we can continue typing)
# attach to dev container shell
$ yarn docker dev
# run migration from inside container
@dev $ yarn db p migrate dev
# build a new prisma client
@dev $ yarn db p
# develop on client with hot reloading
@dev $ yarn start
# this should automatically open a browser window, but you can always go to `http://localhost:5678` in your browser
```

### About VSCode with Remote Container Extension

A `.devcontainer` folder is also provided, which enables the
`Visual Studio Code Remote - Containers` extension (install with ctrl+p, then
`ext install ms-vscode-remote.vscode-remote-extensionpack`) to develop from
inside the container.

> The Visual Studio Code Remote - Containers extension lets you use a Docker
> container as a full-featured development environment. It allows you to open
> any folder inside (or mounted into) a container and take advantage of Visual
> Studio Code's full feature set. A `devcontainer.json` file in your project
> tells VS Code how to access (or create) a development container with a
> well-defined tool and runtime stack. This container can be used to run an
> application or to sandbox tools, libraries, or runtimes needed for working
> with a codebase.

> Workspace files are mounted from the local file system or copied or cloned
> into the container. Extensions are installed and run inside the container,
> where they have full access to the tools, platform, and file system. This
> means that you can seamlessly switch your entire development environment just
> by connecting to a different container.

> This lets VS Code provide a local-quality development experience — including
> full IntelliSense (completions), code navigation, and debugging — regardless
> of where your tools (or code) are located.

See
[Developing inside a Container](https://code.visualstudio.com/docs/remote/containers)
for more.

After the initial setup, you can open this container in VSCode whenever you
like.

This feels like developing locally, while having the advantages of a
pre-configured Docker environment.

#### If you want to use your local configs e.g. `gitconfig` your `ssh` creds.

Uncomment `postCreateCommand` in `devcontainer.json` and the appropriate volume
mounts at service `dev` in `docker-compose.yml`

**WARNING:** on Windows your whole `$HOME` folder will be copied over, including
all your `ssh` creds.

### Using VSCode with Remote Container Extension

### Open project in VSCode and start developing

- Install vscode-extension:
  [ms-vscode-remote.remote-container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- Press `Ctrl+Shift+P`
- Type `>Remote-Containers: Reopen in Container`
- Develop as if you were developing locally
- e.g. Use VSCode File Explorer
- e.g. Run extensions only inside this environment
- e.g. Use bash inside container directly: `yarn start`
  - Try: `Ctrl+Shift+~`, if shell panel is hidden

## Troubleshooting

If you run `docker-compose run server` (rather than `docker-compose up server`)
the ports won't be exposed, so you cannot view your server.
