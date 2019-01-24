const Device = require('src/domain/Device/Device')

const MongooseDeviceMapper = {
  toEntity({ dataValues }) {
    const { id, name } = dataValues

    return new Device({ id, name })
  },

  toDatabase(device) {
    const { name } = device

    return { name }
  }
}

module.exports = MongooseDeviceMapper
