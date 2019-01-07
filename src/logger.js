const config = require('./config')
const { level, transports } = config.logger
const logger = require('@upskill/nucleus-logger')(level, transports)

module.exports = logger
