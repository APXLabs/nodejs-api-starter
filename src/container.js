const { createContainer, Lifetime, asValue } = require('awilix')
const config = require('../config')
const logger = require('./logger')
const mongoose = require('./stores')

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  ['services/*.js', Lifetime.SCOPED],
  ['stores/repositories/*.js', Lifetime.SCOPED],
  ['stores/models/*.js', Lifetime.SINGLETON]
]

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
const configureContainer = async () => {
  await mongoose.connect()
  return createContainer()
    .loadModules(modulesToLoad, {
      // `modulesToLoad` paths should be relative
      // to this file's parent directory.
      cwd: __dirname
    })
    .register({
      logger: asValue(logger),
      config: asValue(config),
      database: asValue(mongoose)
    })
}
module.exports = configureContainer
