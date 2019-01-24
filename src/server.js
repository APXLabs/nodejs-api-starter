/* eslint-disable no-console, no-shadow */

// import { createServer } from '../lib/server'
// import { env } from '../lib/env'
// import { logger } from '../lib/logger'

// createServer().then(
//   app =>
//     app.listen(env.PORT, () => {
//       const mode = env.NODE_ENV
//       logger.debug(`Server listening on ${env.PORT} in ${mode} mode`)
//     }),
//   err => {
//     logger.error('Error while starting up server', err)
//     process.exit(1)
//   }
// )

const createServer = require('./app')
const env = require('./env')

// Shutdown Node.js app gracefully
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [createServer.close]
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) process.exit()
        })
      } catch (err) {
        if (i === actions.length - 1) process.exit()
      }
    })
  }
  if (err) console.log(err)
  if (options.exit) process.exit()
}

// Launch Node.js server
createServer()
  .then(app => {
    app.listen(env.PORT, env.LISTEN_IP, () => {
      const mode = env.NODE_ENV
      console.debug(`Server listening on ${env.LISTEN_IP}:${env.PORT} in ${mode} mode`)
    })
  })
  .catch(err => {
    console.error('Error while starting up server', err)
    process.exit(1)
  })

process.on('exit', handleExit.bind(null, { cleanup: true }))
process.on('SIGINT', handleExit.bind(null, { exit: true }))
process.on('SIGTERM', handleExit.bind(null, { exit: true }))
process.on('uncaughtException', handleExit.bind(null, { exit: true }))
