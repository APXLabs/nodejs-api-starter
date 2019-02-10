const createApp = require('./src/app')
const config = require('./config')
const logger = require('./src/logger')
const http = require('http')

createApp()
  .then(app => {
    const server = http.createServer(app.callback())
    server.on('close', () => {
      logger.debug('Server closing, bye!')
    })

    server.listen(config.port, () => {
      const mode = config.node_env
      logger.info(`[p ${process.pid}] Listening at port ${config.port} in ${mode} mode`)
    })
  })
  .catch(err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  })
