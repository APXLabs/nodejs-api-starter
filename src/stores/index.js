const Mongoose = require('./mongoose')
const config = require('./../../config')

const mongoose = new Mongoose(config)
module.exports = mongoose
