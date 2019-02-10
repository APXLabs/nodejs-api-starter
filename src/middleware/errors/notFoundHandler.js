const logger = require('../../logger')
/**
 * Let the user know nothing was found here.
 */
async function notFoundHandler(ctx) {
  ctx.status = 404
  ctx.body = {
    message: `No endpoint matched the request`
  }
  logger.warn(
    `<-- ${ctx.ip} ${ctx.method} ${ctx.url} ${ctx.status} No endpoint matched the request`
  )
}

module.exports = notFoundHandler
