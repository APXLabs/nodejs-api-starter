import Koa from 'koa';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';

import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';

import defaultRouter from './routes/index';

const app = new Koa();

app
  // Top middleware is the error handler.
  .use(errorHandler)
  // Compress all responses.
  .use(compress())
  // Adds ctx.ok(), ctx.notFound(), etc..
  .use(respond())
  // Parses request bodies.
  .use(bodyParser())
  // Default route
  .use(defaultRouter.routes())
  // Default handler when nothing stopped the chain.
  .use(notFoundHandler);

export default app;
