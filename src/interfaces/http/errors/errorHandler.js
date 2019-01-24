/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
async function errorHandler(ctx, next) {
  const { logger } = ctx.state.container
  try {
    await next()
  } catch (err) {
    logger.error(err)
    ctx.status = err.statusCode || 500
    ctx.body = { message: err.message }
    delete ctx.body.stack
    delete ctx.body.statusCode
  }
}

module.exports = errorHandler
