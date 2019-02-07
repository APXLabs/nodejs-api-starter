class DeviceRepository {
  constructor({ DeviceModel }) {
    this.Device = DeviceModel
  }

  async add(data) {
    console.log('device stored!')
    // return this.Device.create(data)
  }
}
module.exports = DeviceRepository
