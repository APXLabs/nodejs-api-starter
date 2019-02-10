const createServer = require('./src/server')
const config = require('./config')
const logger = require('./src/logger')

createServer()
  .then(app => {
    app.listen(config.port, () => {
      const mode = config.node_env
      logger.info(`[p ${process.pid}] Listening at port ${config.port} in ${mode} mode`)
    })
  })
  .catch(err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  })
