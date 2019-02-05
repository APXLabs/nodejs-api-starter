const request = require('supertest')
const container = require('../container')
const server = container.resolve('server')

module.exports = () => request(server.koa)
