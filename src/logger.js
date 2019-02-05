module.exports = function({ config }) {
  const { level, transports } = config.logger
  return require('@upskill/nucleus-logger')(level, transports)
}
