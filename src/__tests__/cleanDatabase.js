const container = require('../container')
const database = container.resolve('database')

module.exports = () => database && database.mongoose.connection.dropDatabase()
