const { createContainer, asClass, asFunction, asValue } = require('awilix')
const { scopePerRequest } = require('awilix-koa')

const config = require('../config')
const Application = require('./app/Application')
const { CreateDevice } = require('./app/user')

const DeviceSerializer = require('./interfaces/http/device/DeviceSerializer')

const Server = require('./interfaces/http/Server')
const router = require('./interfaces/http/router')
const errorHandler = require('./interfaces/http/errors/errorHandler')

const logger = require('./infra/logging/logger')
const MongooseDevicesRepository = require('./infra/device/MongooseDevicesRepository')
const { database, Device: DeviceModel } = require('./infra/database/models')

const container = createContainer()

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  })

// Middlewares
container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  errorHandler: asValue(errorHandler)
})

// Repositories
container.register({
  DevicesRepository: asClass(MongooseDevicesRepository).singleton()
})

// Database
container.register({
  database: asValue(database),
  DeviceModel: asValue(DeviceModel)
})

// Operations
container.register({
  createDevice: asClass(CreateDevice)
})

// Serializers
container.register({
  DeviceSerializer: asValue(DeviceSerializer)
})

module.exports = container
