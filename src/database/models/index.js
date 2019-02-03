const ModelsLoader = require('src/database/ModelsLoader')
const Mongoose = require('src/database/mongoose')
const config = require('config')

if (config) {
  // Initializes connection to MongoDB
  const mongoose = new Mongoose(config)

  // Returns all the Mongoose models
  module.exports = ModelsLoader.load({
    mongoose,
    baseFolder: __dirname
  })
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.')
}
