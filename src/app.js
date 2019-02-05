const Koa = require('koa')
const { loadControllers } = require('awilix-koa')
const errorHandler = require('./middleware/errors/errorHandler')
const notFoundHandler = require('./middleware/errors/notFoundHandler')

class App {
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
      // Load routes (API "controllers")
      .use(loadControllers('./controllers/*.js', { cwd: __dirname }))
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

module.exports = App
