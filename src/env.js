const { keyblade } = require('keyblade')
const logger = require('./logger')

// `keyblade` will make sure we don't rely on undefined values.
const env = keyblade(process.env, {
  message: key => `${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message)
})

module.exports = env
