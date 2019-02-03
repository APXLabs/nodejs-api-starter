class MongooseDevicesRepository {
  constructor({ DeviceMongoModel }) {
    this.Device = DeviceMongoModel
  }

  async add(data) {
    return this.Device.create(data)
  }
}
module.exports = MongooseDevicesRepository
