const Device = require('src/domain/device/Device')

const MongooseDeviceMapper = {
  toEntity({ dataValues }) {
    const { _id, name } = dataValues

    return new Device({ _id, name })
  },

  toDatabase(Model, device) {
    return new Model(device)
  }
}

module.exports = MongooseDeviceMapper
