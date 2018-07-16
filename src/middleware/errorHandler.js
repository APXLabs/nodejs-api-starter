import logger from '../logger';

/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = { message: err.message };
    delete ctx.body.stack;
    delete ctx.body.statusCode;
    logger.error(err);
  }
}
