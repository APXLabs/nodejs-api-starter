const Koa = require('koa')
const { loadControllers } = require('awilix-koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./errors/errorHandler')
const notFoundHandler = require('./errors/notFoundHandler')

class Server {
  constructor({ config, logger, containerMiddleware }) {
    this.config = config
    this.logger = logger
    this.koa = new Koa()
    this.koa
      // Top middleware is the error handler.
      .use(errorHandler)
      // Creates an Awilix scope per request. Check out the awilix-koa
      // docs for details: https://github.com/jeffijoe/awilix-koa
      .use(containerMiddleware)
      // Parses request bodies.
      .use(bodyParser())
      // Load routes (API "controllers")
      .use(loadControllers('./device/*.js', { cwd: __dirname }))
      // Default handler when nothing stopped the chain.
      .use(notFoundHandler)
  }

  start() {
    return new Promise(resolve => {
      const http = this.koa.listen(this.config.port, () => {
        const { port } = http.address()
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`)
        resolve()
      })
    })
  }
}

module.exports = Server
