class DeviceRepository {
  constructor({ DeviceModel }) {
    this.Device = DeviceModel
  }

  async add(data) {
    return this.Device.create(data)
  }
}
module.exports = DeviceRepository
