/**
 * Let the user know nothing was found here.
 */
async function notFoundHandler(ctx) {
  const msg = `${ctx.request.method} ${ctx.request.path}`
  ctx.response.status = 404
  ctx.response.body = {
    message: `No endpoint matched your request: ${msg}`
  }
}

module.exports = notFoundHandler
