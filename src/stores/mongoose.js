'use strict'
const mongoose = require('mongoose')
const mongoUriBuilder = require('mongo-uri-builder')

class Mongoose {
  constructor(config, logger) {
    this.mongoose = mongoose
    this.mongoose.Promise = global.Promise
    this.mongoose.set('bufferCommands', false)
    this.logger = logger
    this.connectionConfig = config.mongodb
    this.mongooseConfig = config.mongoose || {}
  }

  async connect() {
    return new Promise(async (resolve, reject) => {
      if (!this.connectionConfig) {
        reject(new Error('No Mongo DB connection config provided'))
      }

      // Encode URI components that may contain special characters
      if (this.connectionConfig.username)
        this.connectionConfig.username = encodeURIComponent(this.connectionConfig.username)
      if (this.connectionConfig.password)
        this.connectionConfig.password = encodeURIComponent(this.connectionConfig.password)

      Object.keys(this.connectionConfig.options).forEach(opt => {
        if (
          this.connectionConfig.options[opt] == null ||
          this.connectionConfig.options[opt] === ''
        ) {
          delete this.connectionConfig.options[opt]
        }
      })

      Object.keys(this.mongooseConfig).forEach(opt => {
        if (this.mongooseConfig[opt] == null || this.mongooseConfig[opt] === '') {
          delete this.mongooseConfig[opt]
        }
      })

      const uri = mongoUriBuilder(this.connectionConfig)
      console.info(`Mongo URI: ${uri}`)

      await this.mongoose.connect(uri, this.mongooseConfig).catch(err => {
        reject(err)
      })

      this.mongoose.connection.on('reconnect', () => {
        console.info(
          'MongoDB reconnected: mongodb://%s:%s',
          this.connectionConfig.host,
          this.connectionConfig.port
        )
      })

      this.mongoose.connection.on('close', () => {
        console.error(
          'MongoDB disconnected: mongodb://%s:%s',
          this.connectionConfig.host,
          this.connectionConfig.port
        )
      })
      this.mongoose.connection.on('left', member => console.info(`${member} left the replica set`))
      this.mongoose.connection.on('joined', member =>
        console.info(`${member} joined the replica set`)
      )
      this.mongoose.connection.on('fullsetup', () =>
        console.info('All members connected to the replica set')
      )

      console.info(
        'Initial MongoDB connected: mongodb://%s:%i',
        this.connectionConfig.host,
        this.connectionConfig.port
      )
      resolve()
    })
  }
}

module.exports = Mongoose
