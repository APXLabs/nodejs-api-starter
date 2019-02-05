const { createContainer, asClass, asFunction, asValue } = require('awilix')
const { scopePerRequest } = require('awilix-koa')

const config = require('../config')
const App = require('./app')

const Server = require('./server')
const DeviceService = require('./services/DeviceService')

const logger = require('./logger')
const DeviceRepository = require('./database/repositories/DeviceRepository')
const { database, Device: DeviceModel } = require('./database/models')

const container = createContainer()

// System
container
  .register({
    app: asClass(App).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    config: asValue(config)
  })
  .register({
    logger: asFunction(logger).singleton()
  })

// Middlewares
container.register({
  containerMiddleware: asValue(scopePerRequest(container))
})
// Services
container.register({
  DeviceService: asClass(DeviceService)
})

// Repositories
container.register({
  DeviceRepository: asClass(DeviceRepository).singleton()
})

// Database
container.register({
  database: asValue(database),
  DeviceModel: asFunction(DeviceModel).singleton()
})

module.exports = container
