const { ModelsLoader } = require('src/infrastructure/mongoose')
const Mongoose = require('./mongoose')
const config = require('config')

if (config) {
  const mongoose = new Mongoose(config)

  module.exports = ModelsLoader.load({
    mongoose,
    baseFolder: __dirname
  })
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.')
}
