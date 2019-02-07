const { createContainer, Lifetime, asValue, asFunction } = require('awilix')
const config = require('../config')
const logger = require('./logger')
const { database, Device: DeviceModel, User: UserModel } = require('./database/models')

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  // Services should be scoped to the request.
  // This means that each request gets a separate instance
  // of a service.
  ['services/*.js', Lifetime.SCOPED],
  // Stores will be singleton (1 instance per process).
  ['database/repositories/*.js', Lifetime.SINGLETON]
]

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
const configureContainer = () => {
  return createContainer()
    .loadModules(modulesToLoad, {
      // `modulesToLoad` paths should be relative
      // to this file's parent directory.
      cwd: __dirname
    })
    .register({
      logger: asValue(logger),
      config: asValue(config),
      database: asValue(database),
      DeviceModel: asFunction(DeviceModel).singleton(),
      UserModel: asFunction(UserModel).singleton()
      // })
    })
}
module.exports = configureContainer
// const { createContainer, asClass, asFunction, asValue } = require('awilix')
// const { scopePerRequest } = require('awilix-koa')

// const config = require('../config')
// const App = require('./app')

// const Server = require('./server')
// const DeviceService = require('./services/DeviceService')

// const logger = require('./logger')
// const DeviceRepository = require('./database/repositories/DeviceRepository')
// const { database, Device: DeviceModel } = require('./database/models')

// const container = createContainer()

// // System
// container
//   .register({
//     app: asClass(App).singleton(),
//     server: asClass(Server).singleton()
//   })
//   .register({
//     config: asValue(config)
//   })
//   .register({
//     logger: asValue(logger)
//   })

// // Middlewares
// container.register({
//   containerMiddleware: asValue(scopePerRequest(container))
// })
// // Services
// container.register({
//   DeviceService: asClass(DeviceService).scoped()
// })

// // Repositories
// container.register({
//   DeviceRepository: asClass(DeviceRepository).singleton()
// })

// // Database
// container.register({
//   database: asValue(database),
//   DeviceModel: asFunction(DeviceModel).singleton()
// })

// module.exports = container
