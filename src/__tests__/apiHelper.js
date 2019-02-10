const createApp = require('../app')
const request = require('supertest')
const apiHelper = async () => {
  return (await createApp()).listen()
}

module.exports = async () => request(await apiHelper())
