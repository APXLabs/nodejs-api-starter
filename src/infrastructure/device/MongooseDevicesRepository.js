const DeviceMapper = require('./SequelizeDeviceMapper')

class MongooseDevicesRepository {
  constructor({ DeviceModel }) {
    this.DeviceModel = DeviceModel
  }

  async add(device) {
    const { valid, errors } = device.validate()

    if (!valid) {
      const error = new Error('ValidationError')
      error.details = errors

      throw error
    }

    const newDevice = await this.DeviceModel.create(DeviceMapper.toDatabase(device))
    return DeviceMapper.toEntity(newDevice)
  }
}
module.exports = MongooseDevicesRepository
