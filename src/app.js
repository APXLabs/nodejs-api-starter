const http = require('http')
const Koa = require('koa')
const respond = require('koa-respond')
const bodyParser = require('koa-bodyparser')
const { scopePerRequest, loadControllers } = require('awilix-koa')

const notFoundHandler = require('./middleware/notFoundHandler')
const errorHandler = require('./middleware/errorHandler')
const configureContainer = require('./container')

async function createServer() {
  const app = new Koa()

  // Container is configured with our services and whatnot.
  const container = (app.container = await configureContainer())
  app
    // Top middleware is the error handler.
    .use(errorHandler)
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
    .use(notFoundHandler)

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())

  return server
}

module.exports = createServer
