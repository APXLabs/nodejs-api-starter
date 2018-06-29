# Build Automation Tools

This script is intended to be executed from inside a running Docker container, for example:

```bash
$ docker-compose up             # Launch Docker containers, press CTR+Z (transfer to background)
```

### [`build.js`](./build.js) — compilation

```bash
$ node tools/build              # Compile the app into the ./build folder
```


### [`run.js`](./run.js) — launching for testing/debugging

```bash
$ node tools/run                # Compile the app and launch Node.js server with "live reload"
```

This script will also execute `yarn install` in case some of the Node.js dependencies are missing.
