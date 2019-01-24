const koa = require('koa')

class Server {
  constructor({ config, router, logger }) {
    this.config = config
    this.logger = logger
    this.koa = koa()

    this.koa.disable('x-powered-by')
    this.koa.use(router)
  }

  start() {
    return new Promise(resolve => {
      const http = this.koa.listen(this.config.web.port, () => {
        const { port } = http.address()
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`)
        resolve()
      })
    })
  }
}

module.exports = Server
