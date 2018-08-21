const { createLogger, format, transports } = require('winston')

const { combine, timestamp, printf } = format

const myFormat = printf(info => {
  console.log(info)
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({
      handleExceptions: true
    })
  ]
})

module.exports = logger
