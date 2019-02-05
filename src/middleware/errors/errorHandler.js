const logger = require('../../logger')
/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    if (!err) return

    /* eslint-disable-next-line no-ex-assign */
    if (!(err instanceof Error)) err = new Error(err)

    ctx.status = err.status || err.statusCode || 500
    err.level = err.status < 500 ? 'warn' : 'error'

    if (err.status < 500) {
      ctx.body = { error: err.message }
    } else {
      ctx.body = { error: 'Internal Server Error' }
    }
    logger[err.level](`<-- ${ctx.ip} ${ctx.method} ${ctx.url} ${ctx.status} ${err}`)
  }
}

module.exports = errorHandler
