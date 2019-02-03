const { createContainer, asClass, asFunction, asValue } = require('awilix')
const { scopePerRequest } = require('awilix-koa')

const config = require('../config')
const Application = require('./app/Application')

const Server = require('./interfaces/http/Server')
const DeviceService = require('./services/DeviceService')

const logger = require('./infrastructure/logging/logger')
const MongooseDevicesRepository = require('./infrastructure/device/MongooseDevicesRepository')
const { database, Device: DeviceModel } = require('./infrastructure/mongo/models')

const container = createContainer()

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
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
  DeviceRepository: asClass(MongooseDevicesRepository).singleton()
})

// Database
container.register({
  database: asValue(database),
  DeviceMongoModel: asFunction(DeviceModel).singleton()
})

module.exports = container
