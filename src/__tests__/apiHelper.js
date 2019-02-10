const createServer = require('../server')
const apiHelper = async () => {
  return createServer()
}

module.exports = async () => apiHelper()
