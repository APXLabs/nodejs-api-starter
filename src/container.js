const {
  createContainer,
  Lifetime,
  InjectionMode,
  asValue,
  asClass
} = require('awilix')

const env = require('./env')
const logger = require('./logger')
const Mongo = require('./mongo')

const db = new Mongo(env.MONGO_URI)
db.connect()
  .then(() => {})
  .catch(err => {
    console.log(err.message)
  })

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
  // This is just for demo purposes, you can do whatever you want.
  ['stores/*.js', Lifetime.SINGLETON]
]

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
function configureContainer() {
  const opts = {
    // Classic means Awilix will look at function parameter
    // names rather than passing a Proxy.
    injectionMode: InjectionMode.CLASSIC
  }
  return createContainer(opts)
    .loadModules(modulesToLoad, {
      // `modulesToLoad` paths should be relative
      // to this file's parent directory.
      cwd: `${__dirname}`,
      // Example: registers `services/todo-service.js` as `todoService`
      formatName: 'camelCase'
    })
    .register({
      // Our logger is already constructed,
      // so provide it as-is to anyone who wants it.
      logger: asValue(logger),
      db: asValue(db, { lifetime: Lifetime.SINGLETON })
    })
}

module.exports = configureContainer
