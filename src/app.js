import http from 'http';
import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import { scopePerRequest, loadControllers } from 'awilix-koa';

import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import { configureContainer } from './container';

// import defaultRouter from './routes/index';

async function createServer() {
  console.debug('Creating Server');
  const app = new Koa();

  // Container is configured with our services and whatnot.
  const container = (app.container = configureContainer());
  app
    // Top middleware is the error handler.
    .use(errorHandler)
    // Compress all responses.
    .use(compress())
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Parses request bodies.
    .use(bodyParser())
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
    // Load routes (API "controllers")
    .use(loadControllers('./routes/*.js', { cwd: __dirname }))
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler);

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback());

  return server;
}

export default createServer;
