const { ModelsLoader } = require('src/infra/mongoose')
const Mongoose = require('mongoose')
const { db: config } = require('config')

if (config) {
  const mongoose = new Mongoose(config)

  module.exports = ModelsLoader.load({
    mongoose,
    baseFolder: __dirname
  })
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.')
  /* eslint-enable no-console */
}
