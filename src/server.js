const Koa = require('koa')
const http = require('http')
const { scopePerRequest } = require('awilix-koa')

const errorHandler = require('./middleware/errors/errorHandler')
const notFoundHandler = require('./middleware/errors/notFoundHandler')
const configureContainer = require('./container')
const router = require('./router')
const logger = require('./logger')

const createServer = async () => {
  const app = new Koa()
  const container = (app.container = await configureContainer())
  app
    // Top middleware is the error handler.
    .use(errorHandler)
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
    // Load routes (API "controllers")
    .use(router())
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler)

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())

  server.on('close', () => {
    logger.debug('Server closing, bye!')
  })
  return server
}

module.exports = createServer
