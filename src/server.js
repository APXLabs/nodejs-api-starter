const Koa = require('koa')
const http = require('http')
const { scopePerRequest } = require('awilix-koa')
const errorHandler = require('./middleware/errors/errorHandler')
const notFoundHandler = require('./middleware/errors/notFoundHandler')
const configureContainer = require('./container')
const router = require('./router')
// const userRouter = require('./routes/users')
// const deviceRouter = require('./routes/devices')
const logger = require('./logger')

const createServer = async () => {
  const app = new Koa()
  const container = (app.container = configureContainer())
  app
    // Top middleware is the error handler.
    .use(errorHandler)
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
    // Load routes (API "controllers")
    .use(router())
    // .use(userRouter.routes())
    // .use(
    //   userRouter.allowedMethods({
    //     throw: true
    //   })
    // )
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler)

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    logger.debug('Server closing, bye!')
  })
  logger.debug('Server created, ready to listen')
  return server
}

module.exports = createServer
