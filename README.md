# Node.js API Starter Kit

---

This project was bootstraped with [Node.js API Starter Kit][nodejskit].



## Tech Stack

* [Docker][docker], [Node.js][node], [Yarn][yarn], [JavaScript][js], [Babel][babel], [Prettier][prettier] — core platform and dev tools
* [Jest][jest] - unit and snapshot testing

## Directory Layout

```bash
.
├── /build/                     # The compiled output (via Babel)
├── /src/                       # Node.js application source files
│   ├── /routes/                # Express routes, e.g. /login/facebook
│   ├── /app.js                 # Express.js application
│   ├── /logger.js              # Winston Logger
│   ├── /env.js                 # Environment variables
│   ├── /server.js              # Node.js server (entry point)
├── /tools/                     # Build automation scripts and utilities
├── docker-compose.yml          # Defines Docker services, networks and volumes
├── docker-compose.override.yml # Overrides per developer environment (not under source control)
├── Dockerfile                  # Commands for building a Docker image for production
├── package.json                # List of project dependencies
```


## Prerequisites

* [Docker][docker] Community Edition v17 or higher
* [VS Code][code] editor (preferred) + [Project Snippets][vcsnippets],
  [EditorConfig][vceditconfig], [ESLint][vceslint], and [Prettier][vcprettier]
  plug-ins.


## Getting Started

Just clone the repo and run `docker-compose up`:

```bash
git clone https://github.com/APXLabs/nodejs-api-startergit api
cd api                          # Change current directory to the newly created one
docker-compose up               # Launch Docker containers with the Node.js API app running inside
```

The API server must become available at [http://localhost:5000](http://localhost:5000).

Once the Docker container named `api` is started, the Docker engine executes `node tools/run.js`
command that installs Node.js dependencies, compiles Node.js app from source files 
(see [`src`](./src)) and launches it with "live reload" on port `8080`.

In order to open a shell from inside the running "api" container, run:

```bash
docker-compose exec api /bin/sh
```

For the full list of automation scripts available in this project, please reffer to "scripts"
section in the [`package.json`](./package.json) file and the [`tools`](./tools) folder.


## Testing

```bash
yarn lint                       # Find problematic patterns in code
yarn docker-test                # Run unit tests once inside a Docker container
yarn docker-test-watch          # Run unit tests in watch mode inside a Docker container
```

For more information visit http://facebook.github.io/jest/


## Debugging

In order to run the app with [V8 inspector][v8debug] enabled, simply replace `node tools/run.js`
with `node --inspect=0.0.0.0:9229 tools/run.js` in either [`docker-compose.yml`](docker-compose.yml)
file or, even better, in `docker-compose.override.yml`. Then restart the app (`docker-compose up`) and
[attach your debugger][vsdebug] to `127.0.0.1:9230` (see [`.vscode/launch.json`](./.vscode/launch.json))


## Keeping Up-to-Date

If you keep the original Git history after cloning this repo, you can always fetch and merge
the recent updates back into your project by running:

```bash
git remote add nodejs-api-starter https://github.com/kriasoft/nodejs-api-starter.git
git checkout master
git fetch nodejs-api-starter
git merge nodejs-api-starter/master
docker-compose build --no-cache
docker-compose run --rm --no-deps api yarn
docker-compose up
```

*NOTE: Try to merge as soon as the new changes land on the master branch in Node.js API Starter
repository, otherwise your project may differ too much from the base/upstream repo.*


[nodejskit]: https://github.com/kriasoft/nodejs-api-starter
[rsk]: https://github.com/kriasoft/react-starter-kit
[rsb]: https://github.com/kriasoft/react-static-boilerplate
[node]: https://nodejs.org
[js]: https://developer.mozilla.org/docs/Web/JavaScript
[babel]: http://babeljs.io/
[prettier]: https://prettier.io/
[gql]: http://graphql.org/
[gqljs]: https://github.com/graphql/graphql-js
[gqlrelay]: https://github.com/graphql/graphql-relay-js
[yarn]: https://yarnpkg.com
[demo]: https://graphql-demo.kriasoft.com/
[express]: http://expressjs.com/
[session]: https://github.com/expressjs/session
[flash]: https://github.com/expressjs/flash
[cors]: https://github.com/expressjs/cors
[pg]: https://www.postgresql.org/
[nodepg]: https://github.com/brianc/node-postgres
[psql]: https://www.postgresql.org/docs/current/static/app-psql.html
[do]: https://m.do.co/c/eef302dbae9f
[code]: https://code.visualstudio.com/
[vcsnippets]: https://marketplace.visualstudio.com/items?itemName=rebornix.project-snippets
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[docker]: https://www.docker.com/community-edition
[compose]: https://docs.docker.com/compose/
[v8debug]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[vsdebug]: https://code.visualstudio.com/Docs/editor/debugging
[passport]: http://passportjs.org/
[redis]: https://redis.io/
[knex]: http://knexjs.org/
[loader]: https://github.com/facebook/dataloader
[validator]: https://github.com/chriso/validator.js
[mailer]: https://nodemailer.com/
[hbs]: http://handlebarsjs.com/
[juice]: https://github.com/Automattic/juice
[i18next]: https://www.i18next.com/
[i18nextmid]: https://github.com/i18next/i18next-express-middleware
[i18nextback]: https://github.com/i18next/i18next-node-fs-backend
[jest]: http://facebook.github.io/jest/
[gitter]: https://gitter.im/kriasoft/nodejs-api-starter
